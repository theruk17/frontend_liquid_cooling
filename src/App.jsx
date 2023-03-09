import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import Navbar from './components/Navbar'
import { NumericFormat } from 'react-number-format';
import './App.css'
import pic from './assets/Rectangle-1.jpg'

const API_URL = 'https://drab-jade-haddock-toga.cyclic.app/lc'

function App() {
  const [data, setData] = useState([]);
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios.get(API_URL)
      .then(response => {
        setData(response.data)
        setLoading(false)

        // group the data by a certain property
        const groups = response.data.reduce((acc, item) => {
          const group = item.lc_group;
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(item);
          return acc;
        }, {});

        setGroups(groups);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (

    <div>
      <Navbar />
      {loading ? (
        <div className="animate-pulse w-6 h-6 mx-auto">LOADING</div>
      ) : (
        <div className="bg-slate-100">
          <div className="mx-auto max-w-full py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* <h1 className="text-lg sm:text-3xl text-center pb-1 font-bold text-custom_red1">เลือกเคสแล้วแจ้ง ADMIN ทาง INBOX ได้เลยครับ</h1> */}

            {Object.keys(groups).map(group => (

              <div key={group} className="container mx-auto bg-white shadow rounded-lg mb-2">
                <div className="px-4 py-5 sm:px-6">
                  <div className="h-10 w-full mb-2">
                    <img className="static h-full" src={pic} alt="" />
                    <div className='bg-gradient-to-r from-custom_red1 to-custom_red2 h-1'></div>
                    <div className='relative bottom-9 left-9 text-white font-bold text-2xl uppercase'>LIQUID COOLING {group}</div>
                  </div>
`
                  <div className="grid grid-cols-2 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-5">
                    {groups[group].map(item => (
                      <a key={item.lc_id} href={item.lc_href} target="_blank" className="group">
                        <div className="aspect-w-2 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8 bg-white shadow-md p-2">
                          <div className='h-20 sm:h-16'>
                            <p className="whitespace-nowrap text-lg sm:text-xl font-bold text-center text-black">{item.lc_brand}</p>
                            <p className="text-xs text-center text-red-600">{item.lc_model}</p>
                            <p className="text-xs text-center text-black">{item.lc_color}</p>
                          </div>
                          
                          <div>
                            <img
                              src={item.lc_img}
                              alt={item.lc_model}
                              className=" w-full object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className='flex justify-between items-baseline'>
                            <div><p className="leading-normal text-2xl font-bold text-red-600"><NumericFormat value={item.lc_discount} thousandSeparator="," displayType="text" />.-</p></div>
                            {item.lc_discount === null || (item.lc_discount === item.lc_price_srp) ? "": <div><p className="line-through leading-normal text-md font-normal text-gray-500"><NumericFormat value={item.lc_price_srp} thousandSeparator="," displayType="text" />.-</p></div>}
                              

                            
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  )
}

export default App
