import MobileDesign from '@/components/MobileDesign';
import DesktopDesign from '@/components/DesktopDesign';
export default function Home() {
  return (
    <>
      {/* Mobile design */}
      <div className='h-full min-h-[100vh] text-white md:hidden relative bg-white'>
        <MobileDesign />
      </div>

      {/* Desktop design */}
      <div className='hidden md:block'>
        <DesktopDesign />
      </div>
    </>
  );
}
