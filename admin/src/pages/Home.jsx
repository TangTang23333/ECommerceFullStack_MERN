import styled from 'styled-components';
import Summary from "../components/Summary";
import Chart from "../components/Chart";
import WidgetS from "../components/WidgetS";
import WidgetL from "../components/WidgetL";
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { userRequest } from '../requestMethod';



const RightContainer = styled.div`
flex: 5;
padding: 20px;
`

function Home() {

    const [userStats, setUserStats] = useState([]);
    const user = useSelector(state => state.user.currentUser);



    const Months = useMemo(
        () => ['Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'August',
            'Sep',
            'Oct',
            'Nov',
            'Dec'],

        []);

    useEffect(() => {
        const getUserStats = async () => {

            try {


                const res = await userRequest.get('/users/stats');
                console.log(res.data);
                res.data.map(item => {
                    setUserStats(prev =>
                        [...prev,
                        {   name: Months[item._id.month-1],
                            month: item._id.month,
                            year: item._id.year,
                            'Active User': item.total
                        }]
                    )
                });

                // const sortedUsers = [...userStats];
                // sortedUsers.sort((a, b) => {
                //     return  - new Date(a.year, Months.indexOf(a.month)+1, 1) + new Date(b.year,  Months.indexOf(b.month)+1, 1);
                // });
                // console.log(sortedUsers);
            } catch (err) {
                console.log(err);
            }
        };


        getUserStats();
        // userStats.sort((a, b) => {
        //     return   new Date(a.year, a.month, 1) - new Date(b.year,  b.month, 1);
        // });
        // console.log(userStats);



    }, [Months, user]);
    

    
    return (
        <div >

            <div style={{ display: 'flex' }}>
                <SideBar />

                {user && <RightContainer>
                    <NavBar />
                    <Summary />
                    <Chart title='User Analytics' data={userStats.sort((a, b) => {
                        return   new Date(a.year, a.month, 1) - new Date(b.year,  b.month, 1);
                    })} dataKey='Active User' grid />
                    <div style={{ display: 'flex', margin: '20px' }}>
                        <WidgetS />
                        <WidgetL />
                    </div>
                </RightContainer>}

            </div>
        </div>
    );
}

export default Home;
