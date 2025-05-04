// David
import React from "react";
import { useSearchParams } from 'react-router-dom';

const ProfileStats = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-card p-4 rounded-md shadow-sm">
        <div className="text-2xl font-bold text-foreground">142</div>
        <div className="text-sm text-muted-foreground">Books Read</div>
      </div>
      <div className="bg-card p-4 rounded-md shadow-sm">
        <div className="text-2xl font-bold text-foreground">67</div>
        <div className="text-sm text-muted-foreground">Currently Reading</div>
      </div>
      <div className="bg-card p-4 rounded-md shadow-sm">
        <div className="text-2xl font-bold text-foreground">1,254</div>
        <div className="text-sm text-muted-foreground">Planning</div>
      </div>
    </div>
  );
};

export default ProfileStats;
