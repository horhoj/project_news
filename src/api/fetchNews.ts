import axios from 'axios';
import { addMonths } from 'date-fns';
import { DocView, NewsResponse } from '~/api/fetchNews.types';

export async function fetchNews(offset: number = 0): Promise<{ rows: Array<DocView>; nextOffset: number }> {
  const actualDate = addMonths(new Date(), -offset);
  const month = actualDate.getMonth();
  const year = actualDate.getFullYear();

  const res = await axios.request<NewsResponse>({
    method: 'get',
    url: `/api/svc/archive/v1/${year}/${month + 1}.json?api-key=m7GQtpOJnS1Rxym4icCt33CaQOpBoBze`,
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
        (doc.multimedia.find((el) => el.subtype === 'thumbnail' && el.type === 'image')?.url ?? ''),
      source: doc.source,
      isShowDate,
      url: doc.web_url,
    };
  });
  return { rows, nextOffset: offset + 1 };
}
