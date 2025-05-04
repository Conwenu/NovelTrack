// David
import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
const ProfileStats = () => {
    const {userId} = useParams();

    const [stats, setStats] = useState({ READING: 0, COMPLETED: 0, PLANNING: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const total = stats.READING + stats.COMPLETED + stats.PLANNING;
    useEffect(() => {
      const fetchUserStats = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${userId}/stats`);
          setStats(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching user stats');
          console.log(err)
          setLoading(false);
        }
      };
  
      fetchUserStats();
    }, [userId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }

    

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-card p-4 rounded-md shadow-sm">
        <div className="text-2xl font-bold text-foreground">{stats.COMPLETED}</div>
        <div className="text-sm text-muted-foreground">Books Read</div>
      </div>
      <div className="bg-card p-4 rounded-md shadow-sm">
        <div className="text-2xl font-bold text-foreground">{stats.READING}</div>
        <div className="text-sm text-muted-foreground">Currently Reading</div>
      </div>
      <div className="bg-card p-4 rounded-md shadow-sm">
        <div className="text-2xl font-bold text-foreground">{stats.PLANNING}</div>
        <div className="text-sm text-muted-foreground">Planning</div>
      </div>
    </div>
  );
};

export default ProfileStats;
