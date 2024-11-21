import { useEffect, useState } from 'react';
import img1 from '../assets/images/icon-arcade.svg'
import img2 from '../assets/images/icon-advanced.svg'
import img3 from '../assets/images/icon-pro.svg'
import img4 from '../assets/images/icon-thank-you.svg'
import mobileImg from '../assets/images/bg-sidebar-mobile.svg';

export default function MobileDesign() {
  const [number, setNumber] = useState(0);
  const [time, setTime] = useState('monthly');
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);

  const handleNextClick = (e) => {
    e.preventDefault();
    setNumber((number) => (number >= 3 ? setNumber(0) : setNumber(number + 1)));
  };
  const handlePreviousClick = (e) => {
    e.preventDefault();
    setNumber((number) => number - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (number === 0) {
      if (!value.trim()) {
        setError1(true);
      } else if (!email.trim()) {
        setError2(true);
      } else if (!phone.trim()) {
        setError3(true);
      } else {
        setNumber((number) =>
          number >= 3 ? setNumber(0) : setNumber(number + 1)
        );
      }
    } else {
      setNumber((number) =>
        number >= 3 ? setNumber(0) : setNumber(number + 1)
      );
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError1(false);
      setError2(false);
      setError3(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error1, error2, error3]);
  return (
    <section className='h-[90vh]' style={{ background: 'hsl(206, 94%, 87%)' }}>
      <div
        className='h-[30vh] mob-background'
      ></div>
      <div className='absolute top-0 left-0 w-[100%] h-[100%] px-5 pt-10 flex flex-col items-center'>
        <div className='flex gap-4 justify-center mb-8'>
          <button
            className={`h-[36px] w-[36px] rounded-full border-2 flex justify-center items-center border-gray-100  ${
              number === 0
                ? 'bg-[hsl(206,94%,87%)] text-[hsl(213,96%,18%)]'
                : ''
            } `}
            onClick={() => setNumber(0)}
          >
            1
          </button>
          <button
            className={`h-[36px] w-[36px] rounded-full border-2 flex justify-center items-center border-gray-100 ${
              number === 1
                ? 'bg-[hsl(206,94%,87%)] text-[hsl(213,96%,18%)]'
                : ''
            } `}
            onClick={() => setNumber(1)}
          >
            2
          </button>
          <button
            className={`h-[36px] w-[36px] rounded-full border-2 flex justify-center items-center border-gray-100 ${
              number === 2
                ? 'bg-[hsl(206,94%,87%)] text-[hsl(213,96%,18%)]'
                : ''
            } `}
            onClick={() => setNumber(2)}
          >
            3
          </button>
          <button
            className={`h-[36px] w-[36px] rounded-full border-2 flex justify-center items-center border-gray-100 ${
              number === 3 || number === 'confirm'
                ? 'bg-[hsl(206,94%,87%)] text-[hsl(213,96%,18%)]'
                : ''
            } `}
            onClick={() => setNumber(3)}
          >
            4
          </button>
        </div>
        <div className='flex flex-col justify-between h-full'>
          {number === 0 && (
            <form
              className='flex flex-col justify-between h-full'
              onSubmit={handleSubmit}
            >
              <div className='bg-white rounded-lg px-7 py-9 flex flex-col gap-3 justify-center'>
                <h1
                  className='text-2xl font-bold'
                  style={{ color: 'hsl(213, 96%, 18%)' }}
                >
                  Personal info
                </h1>
                <p style={{ color: 'hsl(231, 11%, 63%)' }}>
                  Please provide your name, email, address, and phone number.
                </p>
                <div className='flex flex-col gap-3 justify-center text-black'>
                  <div className='relative'>
                    <label
                      htmlFor='name'
                      style={{ color: 'hsl(213, 96%, 18%)' }}
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      className={`w-full p-1 rounded-[5px] pl-3 outline-none ${
                        error1
                          ? 'border-red-500 border-2'
                          : 'focus:border-blue-500 border-gray-300 border-2'
                      }`}
                      placeholder='e.g. Stephen King'
                      onChange={(e) => setValue(e.target.value)}
                    />
                    {error1 && (
                      <p className='text-red-500 mt-1 text-sm absolute right-0 bottom-8 font-bold'>
                        *This field is required
                      </p>
                    )}
                  </div>
                  <div className='relative'>
                    <label
                      htmlFor='email'
                      style={{ color: 'hsl(213, 96%, 18%)' }}
                    >
                      Email Address
                    </label>
                    <input
                      type='email'
                      id='email'
                      className={`w-full p-1 rounded-[5px] pl-3 outline-none ${
                        error2
                          ? 'border-red-500 border-2'
                          : 'focus:border-blue-500 border-gray-300 border-2'
                      }`}
                      placeholder='e.g. stephenking@lorem.com'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error2 && (
                      <p className='text-red-500 mt-1 text-sm absolute right-0 bottom-8 font-bold'>
                        *This field is required
                      </p>
                    )}
                  </div>
                  <div className='relative'>
                    <label
                      htmlFor='number'
                      style={{ color: 'hsl(213, 96%, 18%)' }}
                    >
                      Phone Number
                    </label>
                    <input
                      type='number'
                      id='number'
                      className={`w-full p-1 rounded-[5px] pl-3 outline-none ${
                        error3
                          ? 'border-red-500 border-2'
                          : 'focus:border-blue-500 border-gray-300 border-2'
                      }`}
                      placeholder='e.g.+1 234 56 890'
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {error3 && (
                      <p className='text-red-500 mt-1 text-sm absolute right-0 bottom-8 font-bold'>
                        *This field is required
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <footer
                className={`bg-white h-[10vh] flex justify-end items-center py-3 px-5`}
              >
                <button
                  className='px-4 py-2 bg-[hsl(213,96%,18%)] rounded-md text-sm'
                  type='submit'
                >
                  Next Step
                </button>
              </footer>
            </form>
          )}
          {number === 1 && (
            <div className='flex flex-col justify-between h-full'>
              <div className='bg-white rounded-lg px-7 py-9 flex flex-col gap-3 justify-center'>
                <h1
                  className='text-2xl font-bold'
                  style={{ color: 'hsl(213, 96%, 18%)' }}
                >
                  Select your plan
                </h1>
                <p style={{ color: 'hsl(231, 11%, 63%)' }}>
                  You have the option of monthly or yearly billing.
                </p>
                <div className='flex flex-col gap-3 justify-center'>
                  <div>
                    <div className='flex flex-col gap-3'>
                      <div
                        className={`flex cursor-pointer ${
                          time === 'monthly' ? 'items-center' : 'items-start'
                        } gap-5 border-2 ${
                          time === 'monthly' ? 'items-center' : 'items-start'
                        } border-[blue] p-2 rounded-lg`}
                      >
                        <img
                          src={img1}
                          alt=''
                          width={40}
                          height={40}
                        />
                        <div>
                          <h2 className='text-lg text-[hsl(213,96%,18%)] font-bold'>
                            Arcade
                          </h2>
                          <p className='text-[hsl(231,11%,63%)]'>
                            {time === 'monthly' ? '$9/mo' : '$90/yr'}
                          </p>
                          {time !== 'monthly' && (
                            <p className='text-[hsl(213,96%,18%)]'>
                              2 months free
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`flex cursor-pointer hover:border-[blue] ${
                          time === 'monthly' ? 'items-center' : 'items-start'
                        } gap-5 border-2 border-[hsl(229,24%,87%)] p-2 rounded-lg`}
                      >
                        <img
                          src={img2}
                          alt=''
                          width={40}
                          height={40}
                        />
                        <div>
                          <h2 className='text-lg text-[hsl(213,96%,18%)] font-bold'>
                            Advanced
                          </h2>
                          <p className='text-[hsl(231,11%,63%)]'>
                            {time === 'monthly' ? '$12/mo' : '$120/yr'}
                          </p>
                          {time !== 'monthly' && (
                            <p className='text-[hsl(213,96%,18%)]'>
                              2 months free
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`flex cursor-pointer hover:border-[blue] ${
                          time === 'monthly' ? 'items-center' : 'items-start'
                        } gap-5 border-2 border-[hsl(229,24%,87%)] p-2 rounded-lg`}
                      >
                        <img
                          src={img3}
                          alt=''
                          width={40}
                          height={40}
                        />
                        <div>
                          <h2 className='text-lg text-[hsl(213,96%,18%)] font-bold'>
                            Pro
                          </h2>
                          <p className='text-[hsl(231,11%,63%)]'>
                            {time === 'monthly' ? '$15/mo' : '$150/yr'}
                          </p>
                          {time !== 'monthly' && (
                            <p className='text-[hsl(213,96%,18%)]'>
                              2 months free
                            </p>
                          )}
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center gap-3 bg-[hsl(229,24%,87%)] py-2 rounded-lg'>
                    <h2 className='text-[hsl(213,96%,18%)] font-bold'>
                      Monthly
                    </h2>
                    <div
                      className=' w-[42px] h-[21px] rounded-2xl relative flex items-center cursor-pointer'
                      style={{ background: 'hsl(213, 96%, 18%)' }}
                      onClick={() =>
                        setTime((time) =>
                          time === 'monthly' ? 'yearly' : 'monthly'
                        )
                      }
                    >
                      <div
                        className={`w-[15px] h-[15px] rounded-full absolute bg-white top-[3px] ${
                          time === 'monthly' ? 'left-[3px]' : 'right-[3px]'
                        }`}
                      ></div>
                    </div>
                    <h2 className='text-[hsl(231,11%,63%)] font-bold'>
                      Yearly
                    </h2>
                  </div>
                </div>
              </div>
              <footer
                className={` min-h-[10vh] flex justify-between items-center py-3 px-5`}
              >
                <button
                  className='px-4 py-2 text-[hsl(229,24%,87%)]  text-md font-semibold'
                  onClick={(e) => handlePreviousClick(e)}
                >
                  Go Back
                </button>
                <button
                  className='px-4 py-2 bg-[hsl(213,96%,18%)] rounded-md text-sm'
                  onClick={handleNextClick}
                >
                  Next Step
                </button>
              </footer>
            </div>
          )}
          {number === 2 && (
            <div className='flex flex-col justify-between h-full'>
              <div className='bg-white rounded-lg px-7 py-9 flex flex-col gap-3 justify-center'>
                <h1
                  className='text-2xl font-bold'
                  style={{ color: 'hsl(213, 96%, 18%)' }}
                >
                  Pick add-ons
                </h1>
                <p style={{ color: 'hsl(231, 11%, 63%)' }}>
                  Add-ons help enhance your gaming experience.
                </p>
                <div className='flex flex-col gap-3 justify-center'>
                  <div
                    className={`flex items-center gap-5 border-2  border-[blue] p-2 rounded-lg cursor-pointer`}
                  >
                    <input
                      type='checkbox'
                      defaultChecked
                      className='checked:bg-blue-500 checked:text-[white]'
                    />
                    <div className='flex flex-col'>
                      <h2 className='text-lg text-[hsl(213,96%,18%)] font-bold'>
                        Online services
                      </h2>
                      <p className='text-[hsl(231,11%,63%)]'>
                        Access to multiplayer games
                      </p>
                    </div>
                    <p className='text-[blue]'>
                      {time === 'monthly' ? '$1/mo' : '$10/yr'}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-5 border-2  border-[blue] p-2 rounded-lg cursor-pointer`}
                  >
                    <input
                      type='checkbox'
                      defaultChecked
                      className='checked:bg-blue-500 checked:text-[white]'
                    />
                    <div className='flex flex-col'>
                      <h2 className='text-lg text-[hsl(213,96%,18%)] font-bold'>
                        Larger storage
                      </h2>
                      <p className='text-[hsl(231,11%,63%)]'>
                        Access to multiplayer games
                      </p>
                    </div>
                    <p className='text-[blue]'>
                      {time === 'monthly' ? '$2/mo' : '$20/yr'}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-5 border-2  border-[hsl(231,11%,63%)] p-2 rounded-lg hover:border-[blue] cursor-pointer`}
                  >
                    <input
                      type='checkbox'
                      className='checked:bg-blue-500 checked:text-[white]'
                    />
                    <div className='flex flex-col'>
                      <h2 className='text-lg text-[hsl(213,96%,18%)] font-bold'>
                        Customizeable profile
                      </h2>
                      <p className='text-[hsl(231,11%,63%)]'>
                        Access to multiplayer games
                      </p>
                    </div>
                    <p className='text-[blue]'>
                      {time === 'monthly' ? '$2/mo' : '$20/yr'}
                    </p>
                  </div>
                </div>
              </div>
              <footer
                className={` min-h-[10vh] flex justify-between items-center py-3 px-5`}
              >
                <button
                  className='px-4 py-2 text-[hsl(229,24%,87%)]  text-md font-semibold'
                  onClick={(e) => handlePreviousClick(e)}
                >
                  Go Back
                </button>
                <button
                  className='px-4 py-2 bg-[hsl(213,96%,18%)] rounded-md text-sm'
                  onClick={handleNextClick}
                >
                  Next Step
                </button>
              </footer>
            </div>
          )}
          {number === 3 && (
            <div className='flex flex-col justify-between h-full'>
              <div className='bg-white rounded-lg px-7 py-9 flex flex-col gap-3 justify-center'>
                <h1
                  className='text-3xl font-bold'
                  style={{ color: 'hsl(213, 96%, 18%)' }}
                >
                  Finishing up
                </h1>
                <p style={{ color: 'hsl(231, 11%, 63%)' }} className='text-xl'>
                  Double check looks OK before confirming.
                </p>
                <div className='bg-[hsl(206,94%,87%)] rounded-lg p-5 flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <h3 className='text-[hsl(213,96%,18%)] font-bold'>
                        {time === 'monthly'
                          ? 'Arcade (Monthly)'
                          : 'Arcade (Yearly)'}
                      </h3>
                      <h3 className='underline text-[hsl(231,11%,63%)] hover:text-[blue] cursor-pointer'>
                        change
                      </h3>
                    </div>
                    <h3 className='text-[hsl(213,96%,18%)]'>
                      {time === 'monthly' ? ' +$9/mo' : ' +$90/yr'}
                    </h3>
                  </div>
                  <hr />
                  <div className='flex items-center justify-between'>
                    <h3 className='text-[hsl(231,11%,63%)]'>Online service</h3>
                    <p className='text-[hsl(213,96%,18%)]'>
                      {time === 'monthly' ? ' +$1/mo' : ' +$10/yr'}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-[hsl(231,11%,63%)]'>Larger storage</h3>
                    <p className='text-[hsl(213,96%,18%)]'>
                      {time === 'monthly' ? ' +$2/mo' : ' +$20/yr'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center justify-between px-5'>
                  <h3 className='text-[hsl(231,11%,63%)]'>
                    Total {time === 'monthly' ? '(per month)' : '(per year)'}
                  </h3>
                  <p className='text-[blue] font-semibold'>
                    {time === 'monthly' ? ' +$12/mo' : ' +$120/yr'}
                  </p>
                </div>
              </div>
              <footer
                className={`bg-white min-h-[10vh] flex justify-between items-center py-3 px-5`}
              >
                <button
                  className='px-4 py-2 text-[hsl(229,24%,87%)]  text-md font-semibold'
                  onClick={(e) => handlePreviousClick(e)}
                >
                  Go Back
                </button>
                <button
                  className='px-4 py-2 bg-[blue] rounded-lg text-sm'
                  onClick={() => setNumber('confirm')}
                >
                  Confirm
                </button>
              </footer>
            </div>
          )}
          {number === 'confirm' && (
            <div className='bg-white rounded-lg py-16 px-5 flex flex-col gap-3 justify-center max-w-[550px]'>
              <div className='flex flex-col gap-3 items-center justify-center'>
                <img
                  src={img4}
                  width={50}
                  height={50}
                  alt='Thank you image'
                />
                <h1 className='text-2xl text-[hsl(213,96%,18%)] font-bold'>
                  Thank you!
                </h1>
              </div>
              <div>
                <p className='text-center text-xl text-[hsl(231,11%,63%)]'>
                  Thanks for confirming your subscription!
                </p>
                <p className='text-center text-[hsl(231,11%,63%)] text-xl text-wrap'>
                  We hope you have fun using our platform. If you ever need our
                  support, please feel free to email us at
                  support@loremgaming.com
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
