import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import Tools from './Tools';

const ShowTools = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // const formattedDate = format(date, 'PP');
    // const { data: items, isLoading, refetch } = useQuery(['tools'], () => fetch('https://whispering-plains-91117.herokuapp.com/tools')
    //     .then(res => res.json()))

    // if(isLoading){
    //     return <Loading></Loading>
    // }

    useEffect(() => {
        fetch('https://whispering-plains-91117.herokuapp.com/tools')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div className='my-15'>
                <h3 className='text-center text-primary text-3xl font-bold uppercase mt-14'>Our Tools</h3>
            </div>
            {isLoading ? (<Loading></Loading>) : (<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-14 my-14'>
                {
                    items?.map(tool => <Tools
                        key={tool._id}
                        tool={tool}
                    ></Tools>)
                }
            </div>)}
        </div>
    );
};

export default ShowTools;