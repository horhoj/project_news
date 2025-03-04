import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import React from 'react';
import { fetchNews } from '~/api/fetchNews';
import { Header } from '~/components/Header';
import { Spinner } from '~/components/Spinner';
import { Footer } from '~/components/Footer';

const REFETCH_INTERVAL_MS = 30000;

export function App() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: (ctx) => fetchNews(ctx.pageParam),
    getNextPageParam: (lastGroup) => lastGroup.nextOffset,
    initialPageParam: 0,
    refetchInterval: REFETCH_INTERVAL_MS,
  });

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  const parentRef = React.useRef<HTMLDivElement>(null);

  const count = hasNextPage ? allRows.length + 1 : allRows.length;
  const virtualizer = useWindowVirtualizer({
    count,
    estimateSize: () => 45,
    enabled: true,
  });

  const items = virtualizer.getVirtualItems();

  React.useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage, virtualizer.getVirtualItems()]);

  return (
    <>
      <Header />

      <div ref={parentRef} className="global-container mx-auto mt-16 bg-white">
        <div
          style={{
            height: virtualizer.getTotalSize(),
          }}
          className={'relative w-full bg-white'}
        >
          <div
            style={{
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
            className={'absolute top-0 left-0 w-full bg-white'}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const post = allRows[virtualRow.index];

              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  className={'pt-8 bg-white'}
                >
                  <>
                    {isLoaderRow ? (
                      hasNextPage ? (
                        <>
                          <div className={'pt-12 w-full  h-48 flex items-center justify-center '}>
                            <Spinner />
                          </div>
                          <Footer />
                        </>
                      ) : (
                        <>
                          <div>Nothing more to load</div>
                          <Footer />
                        </>
                      )
                    ) : (
                      <div className={'bg-white'}>
                        <div className={'px-4 py-8 text-lg font-bold'}>
                          {post.isShowDate ? (
                            <>News for {new Date(post.date).toLocaleDateString()}</>
                          ) : (
                            <div className={'border'} />
                          )}
                        </div>
                        <a
                          target={'_blank'}
                          href={post.url}
                          className={'flex gap-3 px-4 cursor-pointer'}
                          rel="noreferrer"
                        >
                          <img
                            src={post.img}
                            className={
                              'block min-w-[99px] min-h-[74px] max-w-[99px] max-h-[74px] bg-black mt-5 object-cover'
                            }
                            alt={'post-img'}
                            loading={'lazy'}
                          />
                          <div className={'flex flex-col gap-2'}>
                            <div className={'text-[#096FFA]'}>{post.source}</div>
                            <div className={'text-base'}>{post.description}</div>
                            <div className={'text-[#6D787A]'}>{new Date(post.date).toLocaleString()}</div>
                          </div>
                        </a>
                      </div>
                    )}
                  </>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
