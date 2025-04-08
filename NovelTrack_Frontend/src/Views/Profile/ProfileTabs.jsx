import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useState } from 'react';
import RecentReviews from './RecentReviews';
import ProfileStats from './ProfileStats';
import BookTrackingPage from './TempTrackList';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mx-auto py-6">
      <TabGroup selectedIndex={activeTab} onChange={setActiveTab}>
        <div className="overflow-x-auto mb-6">
          <TabList
            className="flex space-x-4 min-w-max sm:space-x-8 md:space-x-12 
            sm:justify-center md:justify-between" 
          >
            <Tab
              className={({ selected }) =>
                classNames(
                  'py-2 px-4 text-sm font-semibold rounded-md',
                  selected
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-600 hover:bg-blue-200'
                )
              }
            >
              Overview
            </Tab>
            
            <Tab
              className={({ selected }) =>
                classNames(
                  'py-2 px-4 text-sm font-semibold rounded-md',
                  selected
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-600 hover:bg-blue-200'
                )
              }
            >
              Tracklist
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'py-2 px-4 text-sm font-semibold rounded-md',
                  selected
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-600 hover:bg-blue-200'
                )
              }
            >
              Recent Reviews
            </Tab>
          </TabList>
        </div>

        <TabPanels className="w-full">
          <TabPanel className="w-full">
            <ProfileStats/>
          </TabPanel>

          <TabPanel className="w-full">
            <BookTrackingPage/>
          </TabPanel>

          <TabPanel className="w-full">
            <RecentReviews />
          </TabPanel>
          
        </TabPanels>
      </TabGroup>
    </div>
  );
}
