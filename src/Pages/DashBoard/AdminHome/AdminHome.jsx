import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaTruck, FaUsers } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend  } from 'recharts';


const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data:  status, isLoading} = useQuery({
        queryKey: 'admin-status',
        queryFn: async() => {
            const res = await axiosSecure.get('/admin-status');
            return res.data;
        }
    });
    // console.log(status);
    const { revenue = 0, users = 0, menuItems = 0, orders = 0 } = status || {};

    const { data: chartData = [] } = useQuery({
        queryKey: 'order-status',
        queryFn: async () => {
            const res = await axiosSecure.get('/order-status');
            return res.data;
        }
    })
    // console.log(chartData);

    if(isLoading){
        return <progress className="progress w-56"></progress>
    }

    // coustom shape for the bar chart
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };
    
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    //coustom shape for the pie chart data
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChart = chartData.map((item) => {
        return {
            name: item.category,
            value: item.revenue
        }
    });

    return (
        <div>
            <h1 className="text-3xl">
                Hi, Welcome {
                    user?.displayName ? user.displayName : "Back"
                }
            </h1>

            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl"></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${revenue}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{users}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl"></FaBook>
                    </div>
                    <div className="stat-title">Menu Items</div>
                    <div className="stat-value">{menuItems}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaTruck className="text-3xl"></FaTruck>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{orders}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>

            <div className="flex">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieChart}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="top" />
                </PieChart>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;
