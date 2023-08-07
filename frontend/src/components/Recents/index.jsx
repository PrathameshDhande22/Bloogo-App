import { RecentItems } from "../RecentItems";

export const Recents = () => {
  return (
    <div className="space-y-4">
      <div className="font-noto text-xl font-bold sm:text-2xl">
        Recent Searches
      </div>
      <RecentItems />
    </div>
  );
};
