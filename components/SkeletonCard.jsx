import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => {
  return (
    <div className="pb-4 text-center shadow-[0_10px_30px_rgba(140, 82, 255, 0.9)] bg-[rgb(14,19,19)] mx-1 sm:mx-4 my-8 rounded-lg px-1">
      <SkeletonTheme baseColor="#1c1c24" highlightColor="#21212b ">
        <Skeleton className="mb-2" borderRadius={10} height={200} />
        <Skeleton className="my-2" height={16} width={160} />
        <Skeleton className="my-4" height={16} width={160} />
        <div className="grid grid-cols-2 gap-2 mx-2">
          <Skeleton borderRadius={30} height={40} />
          <Skeleton borderRadius={30} height={40} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonCard;
