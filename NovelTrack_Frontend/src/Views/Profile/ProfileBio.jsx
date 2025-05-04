// David
import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { Calendar, MapPin } from "lucide-react";
import axios from "axios";

const ProfileBio = () => {
  const { userId } = useParams();
  const userData = localStorage.getItem('user');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${userId}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user');
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-foreground">{user.username}</h1>
      <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Joined May 2025</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span>USA</span>
        </div>
      </div>

      <div className="mt-4 text-foreground">
        <p>
          {user.description || "Book enthusiast and collector. I love exploring new worlds through literature!"}
        </p>
      </div>
    </div>
  );
};

export default ProfileBio;
