// Data.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import './mine.css'

const Data = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        // Filter posts with user ID 1
        const filteredPosts = response.data.filter(post => post.userId === 1);
        setPostData(filteredPosts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const totalPosts = postData.length;
  const user1Posts = postData.filter(post => post.userId === 1).length;

  const data = [
    { name: 'User 1', value: user1Posts },
    { name: 'Other Users', value: totalPosts - user1Posts },
  ];
 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Data Page</h1>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {postData.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="max-w-md mx-auto">
        <h3>Pie Chart</h3>
        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#8884d8' : '#82ca9d'} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>



  );
};

export default Data;
