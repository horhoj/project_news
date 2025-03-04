import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import axios from 'axios';
import React from 'react';
import { addMonths } from 'date-fns';
import { DocView, NewsResponse } from './response.types';

async function fetchServerPage(
  limit: number,
  offset: number = 0,
): Promise<{ rows: Array<DocView>; nextOffset: number }> {
  const actualDate = addMonths(new Date(), -offset);
  const month = actualDate.getMonth();
  const year = actualDate.getFullYear();

  const res = await axios.request<NewsResponse>({
    method: 'get',
    url: `https://api.nytimes.com/svc/archive/v1/${year}/${month + 1}.json?api-key=m7GQtpOJnS1Rxym4icCt33CaQOpBoBze`,
  });

  const prevDate: { value: string | null } = { value: null };

  const rows: DocView[] = res.data.response.docs.reverse().map((doc) => {
    const isShowDate = !(
      new Date(prevDate.value ?? '').toLocaleDateString() === new Date(doc.pub_date).toLocaleDateString()
    );
    prevDate.value = doc.pub_date;

    return {
      date: doc.pub_date,
      description: doc.abstract,
      img:
        'https://www.nytimes.com/' +
        (doc.multimedia.find((el) => el.subtype === 'xlarge' && el.type === 'image')?.url ?? ''),
      source: doc.source,
      isShowDate,
    };
  });
  return { rows, nextOffset: offset + 1 };
}

export function App() {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: ['projects'],
      queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
      getNextPageParam: (lastGroup) => lastGroup.nextOffset,
      initialPageParam: 0,
      refetchInterval: 30000,
    },
  );

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  const parentRef = React.useRef<HTMLDivElement>(null);

  const count = hasNextPage ? allRows.length + 1 : allRows.length;
  const virtualizer = useWindowVirtualizer({
    count,
    // getScrollElement: () => parentRef.current,
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
      <div className={'fixed min-h-20 left-0 top-0 bg-white w-full z-50'}>123123123123</div>
      <div ref={parentRef} className="max-w-[1000px] mx-auto mt-16 bg-white">
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
            {virtualizer.getVirtualItems().map((virtualRow, i, arr) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const post = allRows[virtualRow.index];

              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  className={'mt-4 bg-white'}
                >
                  <>
                    {isLoaderRow ? (
                      hasNextPage ? (
                        'Loading more...'
                      ) : (
                        'Nothing more to load'
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
                        <div className={'flex gap-3 px-4'}>
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
                            <div>{post.description}</div>
                            <div className={'text-[#6D787A]'}>{new Date(post.date).toLocaleString()}</div>
                          </div>
                        </div>
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
