// data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

interface Item {
  [key: string]: string | number | boolean | null | Date;
}

interface JsonData {
  data: {
    count: number;
    items: Item[];
  };
}


const getData = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rawData = fs.readFileSync('public/data.json', 'utf-8');
    const jsonData: JsonData = JSON.parse(rawData);

    if (!jsonData || !jsonData.data || !jsonData.data.items || !Array.isArray(jsonData.data.items)) {
      throw new Error('Invalid JSON data structure or missing items array.');
    }

    const { page, pageSize } = req.body; // When data is sent in the body of an HTTP request, it is typically sent as text. The most common format for representing structured data in the body of a request is JSON (JavaScript Object Notation). In a JSON payload, all values are represented as strings, numbers, booleans, objects, arrays, or null.
    const pageNum = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;//this line of code states that the pages should be treated as Int and it should be converted to base 10  and default value take in  incase of NaN here default pafge size is 10
    const { items } = jsonData.data;//here we extracted the items form our json data.
    let filteredData = items.slice((pageNum - 1) * size, pageNum * size);//this state start index to end index of data to be displayed on a page.

    res.status(200).json({
      count: jsonData.data.count,
      items: filteredData,
    });
  } catch (error) {
    console.error('Error reading or processing data.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    getData(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
