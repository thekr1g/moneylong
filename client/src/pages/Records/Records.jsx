import React, {useEffect, useRef, useState} from 'react';
import style from './Records.module.css'
import CalendarModule from '../../components/CalendarModule/CalendarModule';
import AddRecordModal from '../../components/Modals/AddRecordModal/AddRecordModal';
import {fetchAccounts} from '../../http/accountAPI';
import {setAccountsAC} from '../../redux/accountReducer';
import {fetchAccountType} from '../../http/accountTypeAPI';
import {setAccountTypesAC} from '../../redux/accountTypeReducer';
import Spinner from '../../components/Spinner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategory} from '../../http/categoryAPI';
import {setCategoryAC} from '../../redux/categoryReducer';
import {fetchRecord} from '../../http/recordAPI';
import {setRecordAC} from '../../redux/recordReducer';
import RecordsList from './RecordsList/RecordsList';


const Records = () => {
  const user = useSelector(state => state.user.user)
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('Последние 7 дней')
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()

  const handleClickOutside = event => {
    const {current: wrap} = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      // setDropDownStyle(style.colorBlock)
    }
  };
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  });


  useEffect(() => {
    fetchRecord().then(data => {
      dispatch(setRecordAC(data))
    })
  }, [selectedFilter])

  useEffect(() => {
    fetchAccounts(user.id).then(data => {
      dispatch(setAccountsAC(data))
    })
    fetchCategory().then(data => {
      dispatch(setCategoryAC(data))
    })
    fetchRecord(user.id, ).then(data => {
      dispatch(setRecordAC(data))
    })
    fetchAccountType().then(data => {
      dispatch(setAccountTypesAC(data))
    }).finally(() => setLoading(false))
  }, [])


  if (loading) {
    return <Spinner/>
  }

  return (
    <div>
      <AddRecordModal setActive={setActive} active={active}/>
      <div style={{marginLeft: '35%'}}>
        <div style={{position: 'relative'}}>
          <input type="text" value={selectedFilter} readOnly
                 className={display ? style.selectedFilterActive : style.selectedFilter}
                 onClick={() => setDisplay(!display)}/>
          <div className={style.arrow}>
            <span className="material-icons-round">arrow_drop_down</span>
          </div>
        </div>
        {display && (
          <div className={style.period}>
            <div className={selectedFilter === 'Последние 7 дней' ? style.filterBlockActive : style.filterBlock}
                 onClick={() => {
                   if (selectedFilter !== 'Последние 7 дней') {
                     setSelectedFilter('Последние 7 дней')
                     setDisplay(false)
                   }
                 }}>Последние 7 дней
            </div>
            <div className={selectedFilter === 'Последние 30 дней' ? style.filterBlockActive : style.filterBlock}
                 onClick={() => {
                   if (selectedFilter !== 'Последние 30 дней') {
                     setSelectedFilter('Последние 30 дней')
                     setDisplay(false)
                   }
                 }}>Последние 30 дней
            </div>
            <div className={selectedFilter === 'Последние 90 дней' ? style.filterBlockActive : style.filterBlock}
                 onClick={() => {
                   if (selectedFilter !== 'Последние 90 дней') {
                     setSelectedFilter('Последние 90 дней')
                     setDisplay(false)
                   }
                 }}>Последние 90 дней
            </div>
          </div>
        )}
      </div>
      <div className={style.main}>
        <div>
          <div className={style.records}>Записи</div>
          <button className={style.addButton} onClick={() => {setActive(true)}}>+ Добавить</button>
        </div>
        <div style={{marginTop: '30px'}}>
          <RecordsList/>
        </div>
      </div>
    </div>
  );
};

export default Records;