import {TagLabel } from "../../components/tag";
import {Pagination, Row} from 'antd';
import { getProduct, getTag } from "../../api/product";
import { useEffect, useState } from "react";
import Cards, { CardSkeleton } from "../../components/card";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../features/query/querySlice";

const Home = () => {
    const dispatch = useDispatch();
    const query = useSelector(state => state.query)
    const [tag, setTag] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const [loading, setLoading] = useState(true)

    const fetchTag = async () => {
        try {
            const response = await getTag()
            const result = response.data;
            setTag(d => result)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await getProduct(`tags=${selectedTag}&category=${query.categories}&q=${query.q}&skip=${(currentPage - 1) * 10}&limit=${10}`)
            const result = response.data;
            setData(data => result.data);
            setLoading(false);
            setTotalPage(result.count);
            console.log(result.count)
            if(result.count <= 10){
                setcurrentPage(1)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleSearch = (value) => {
        dispatch(setQuery({ q: value}))
    }

    const handleChangeTag = (tagName, checked) => {
        const nextTag = checked ? [...selectedTag, tagName] : selectedTag.filter((tag) => tag !== tagName);
        setSelectedTag(nextTag);
    }

    useEffect(() => {
        fetchProduct();
        fetchTag();
    },[query, currentPage, selectedTag])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 block justify-center">
            {/* Search Form */}
            
            <div className="mt-8 w-full flex">
                <label htmlFor=""></label>
                <input type="text" placeholder="Search menu here..." className="border-slate-300 border w-full p-2 h-10 rounded" onChange={(e) => handleSearch(e.target.value)}/>
            </div>

            {/* Tags */}
            <div className="mt-4 w-full flex px-1 items-center">
                <h2 className='mr-1 mt-1'>Tags:</h2>
                {tag.map((tag, i) => {return <TagLabel key={i} name={tag.name} handleChange={handleChangeTag} keys={tag._id}/>})}
            </div>
            
            {/* Card */}

            <Row gutter={16} className="mt-10">
                {
                    loading? (
                        <CardSkeleton />
                    ) : (
                        data.map((items, i) => {
                            return (
                                <Cards items={items} keyCard={i}/>
                            )
                        })
                    )
                }
            </Row>
            <Pagination 
                className="pb-10" 
                current={currentPage} 
                defaultPageSize={10} 
                total={totalPage} 
                onChange={(page) => setcurrentPage(page)}/> 
        </div>
    )
}
export default Home;