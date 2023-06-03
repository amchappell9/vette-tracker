import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
  return (
    <div className="flex h-full justify-center py-8">
      <UserProfile />
    </div>
  );
};

export default UserProfilePage;
