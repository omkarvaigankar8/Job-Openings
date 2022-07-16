// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import '../App.css';
import Text from '../components/Input';
import Dropdown from '../components/Select';
import { fetchData } from '../components/api'
// import { api } from '../components/api';
import Jobs from '../components/Jobs';
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}
function App() {
  const [data, setData] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [locationClear, setLocationClear] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [departmentID, setDepartmentId] = useState(null);
  const [departmentClear, setDepartmentClear] = useState(false);
  const [departmentData, setDepartmentData] = useState(null);
  const [functionId, setFunctionId] = useState(null);
  const [functionClear, setFunctionClear] = useState(false);
  const [functionData, setFunctionData] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [groupData, setGroupData] = useState(null)
  useEffect(() => {
    fetchData((data) => {
      setData(data.data)
      setMainData(data.data)
    }, 'jobs')
    fetchData((data) => {
      setLocationData(data.data)
    }, 'locations')
    fetchData((data) => {
      setFunctionData(data.data)
    }, 'functions')
    fetchData((data) => {
      setDepartmentData(data.data)
    }, 'departments')
    setReloadData(false)
    if(searchKey !== ''){
      console.log("KEY",searchKey)
      searchFilter();
    }
  }, [reloadData])
  useEffect(() => {
    if (data) {
      let result = data.reduce(function (r, a) {
        r[a.function.title] = r[a.function.title] || [];
        r[a.function.title].push(a);
        return r;
      }, Object.create(null));
      result = Object.values(result)

      //console.log("result", result);
      setGroupData(result)
    }
  }, [data])
  const filterDepartmentHandler = (val) => {
    //console.log('1111111111111')
    setDepartmentId(val)
    let filterData = data && data.filter(function (event) {
      return val && event.department.title === val;
    });
    let filteredLocation = [];
    let filteredFunction = [];
    filterData && filterData.map((item) => {
      filteredLocation.push(item.location)
      filteredFunction.push(item.function)
    })
    let uniqueLocation = getUniqueListBy(filteredLocation, 'title')
    let uniqueFunction = getUniqueListBy(filteredFunction, 'title')
    setLocationData(uniqueLocation)
    setFunctionData(uniqueFunction)
    setData(filterData)
  }

  const filterLocationHandler = (val) => {
    //console.log("VAL", val)
    setLocationId(val)
    //console.log("DATA B4 filter", data)
    let filterData = data && data.filter(function (event) {
      return val && event.location.title === val;
    });
    let filteredDepartment = [];
    let filteredFunction = [];
    filterData && filterData.map((item) => {
      filteredDepartment.push(item.department)
      filteredFunction.push(item.function)
    })
    //console.log("filterData", filterData)

    //console.log("1st filteredDepartment", filteredDepartment)
    //console.log("1st filteredFunction", filteredFunction)
    let uniqueDepartment = getUniqueListBy(filteredDepartment, 'title')
    let uniqueFunction = getUniqueListBy(filteredFunction, 'title')
    //console.log("uniqueDepartment", uniqueDepartment)
    setDepartmentData(uniqueDepartment)
    setFunctionData(uniqueFunction)
    setData(filterData)
  }
  const filterFunctionHandler = (val) => {

    setFunctionId(val)
    let filterData = data && data.filter(function (event) {
      return val && event.function.title === val;
    });
    let filteredDepartment = [];
    let filteredLocation = [];
    filterData && filterData.map((item,index) => {
      filteredLocation.push(item.location)
      filteredDepartment.push(item.department)
    })
    //console.log("FFF", filteredLocation)
    //console.log("FFF filteredDepartment", filteredDepartment)
    let uniqueDepartment = getUniqueListBy(filteredDepartment, 'title')
    let uniqueLocation = getUniqueListBy(filteredLocation, 'title')
    setDepartmentData(uniqueDepartment)
    setLocationData(uniqueLocation)
    setData(filterData)
  }


  const cancelDepartmentHandler = () => {
    setDepartmentId(null)
    setDepartmentClear(true)
    setData(mainData)
    fetchData((data) => {
      setDepartmentData(data.data)
      //console.log("@nd ", data.data)
    }, 'departments')
    filteredLocationValue(locationId);
    if (locationId == null && functionId == null) {
      clearSelectedHandler();
    }
  }
  const cancelFunctionHandler = () => {
    setFunctionId(null)
    setFunctionClear(true)
    setData(mainData);
    fetchData((data) => {
      setFunctionData(data.data)
      //console.log("www", data.data)
    }, 'functions')
    if (locationId) {
      filteredLocationValue(locationId)
    }
    if (departmentID) {
      filteredDepartmentValue(departmentID)
    }
    if (locationId == null && departmentID == null) {
      clearSelectedHandler();
    }
  }
  const cancelLocationHandler = () => {
    setLocationId(null)
    //console.log('locationID', locationId)
    if (departmentID == null && functionId == null) {
      clearSelectedHandler();
    }
    setLocationClear(true)
    fetchData((data) => {
      setLocationData(data.data)
      //console.log("llllll", data.data)

    }, 'locations')

    filteredLocationValue(locationId)
  }
  const clearSelectedHandler = () => {
    setReloadData(true);
    cancelFunctionHandler()
    cancelDepartmentHandler()
    cancelLocationHandler()
  }
  const filteredLocationValue = (id) => {
    //console.log("main", mainData)
    let content = mainData;
    if (id == null) {
      
    }
    else {
      content = mainData && mainData.filter(function (event) {
        return id && event.location.title === id;
      });
      //console.log("content", content)
      let filteredDepartment = [];
      let filteredFunction = [];
      content && content.map((item,index) => {
        filteredDepartment.push(item.department)
        filteredFunction.push(item.function)
      })
      setData(content)
      //console.log("2nd filteredDepartment", filteredDepartment)
      //console.log("2nd filteredFunction", filteredFunction)
      let uniqueDepartment = getUniqueListBy(filteredDepartment, 'title')
      let uniqueFunction = getUniqueListBy(filteredFunction, 'title')
      //console.log("uniqueDepartment", uniqueDepartment)
      setDepartmentData(uniqueDepartment)
      setFunctionData(uniqueFunction)
    }
  }
  const filteredDepartmentValue = (id) => {
    //console.log("main", mainData)
    //console.log("id", id)
    let content = mainData;
    content = mainData && mainData.filter(function (event) {
      return id && event.department.title === id;
    });
    //console.log("content", content)
    let filteredLocation = [];
    let filteredFunction = [];
    content && content.map((item,index) => {
      filteredLocation.push(item.location)
      filteredFunction.push(item.function)
    })
    setData(content)
    //console.log("2nd filteredDepartment", filteredLocation)
    //console.log("2nd filteredFunction", filteredFunction)
    let uniqueDepartment = getUniqueListBy(filteredLocation, 'title')
    let uniqueFunction = getUniqueListBy(filteredFunction, 'title')
    //console.log("uniqueDepartment", uniqueDepartment)
    setLocationData(uniqueDepartment)
    setFunctionData(uniqueFunction)

  }
  const searchFilter = () => {
    // console.log("USE", mainData)
    //console.log("UsearchKeySE", searchKey)
    if (searchKey) {
      let filterData = mainData && mainData.filter(function (event) {
        return searchKey && event.title.toLowerCase().includes(searchKey.toLowerCase());
      });
      // console.log("AFTER Search", filterData)
      setData(filterData)
      if (departmentID) {
        filteredDepartmentValue(departmentID);
      }
      if (locationId) {
        filteredLocationValue(locationId)
      }
    }
    else {
      // console.log("AFTER KEY", searchKey)
      setData(mainData)
    }

  }
  useEffect(() => {
    searchFilter();
  }, [searchKey])
  return (
    <div className="container">
      <div className="filter_container">
        <Text searchKey={searchKey} searchFilter={searchFilter} data={data} setSearchKey={setSearchKey} placeholder={'Search Job Title'} />
        <div className='dropdown_container'>
          <Dropdown placeholder={'Location'} setClear={setLocationClear} clear={locationClear} data={locationData} onChange={filterLocationHandler} />
          <Dropdown placeholder={'Department'} setClear={setDepartmentClear} clear={departmentClear} data={departmentData} onChange={filterDepartmentHandler} />
          <Dropdown placeholder={'Function'} setClear={setFunctionClear} clear={functionClear} data={functionData} onChange={filterFunctionHandler} />
        </div>
      </div>
      {(locationId || departmentID || functionId) &&
        <div className="drop_values">
          <div className='filters'>
            {locationId && <p>{locationId} <span onClick={cancelLocationHandler}>X</span></p>}
            {departmentID && <p>{departmentID} <span onClick={cancelDepartmentHandler}>X</span></p>}
            {functionId && <p>{functionId} <span onClick={cancelFunctionHandler}>X</span></p>}
          </div>
          <div className='clear_all'onClick={clearSelectedHandler}><p>Clear All</p></div>
        </div>}
      {groupData && groupData.map((item, index) => {
        return <Jobs data={item} key={index} />
      })}
    </div>
  );
}

export default App;
