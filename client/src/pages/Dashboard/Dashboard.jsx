import React, {useEffect, useState} from 'react';
import Cards from '../../components/Cards/Cards';
import logo from '../../assets/banknotes.png';
import logo2 from '../../assets/credit-cards.png';
import style from './Dashboard.module.css'
import Panel from './Panel/Panel';
import AddButton from './AddButton/AddButton';
import AddAccountModal from '../../components/Modals/AddAccountModal/AddAccountModal';
import {fetchAccountType} from '../../http/accountTypeAPI';
import Spinner from '../../components/Spinner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {setAccountTypesAC} from '../../redux/accountTypeReducer';
import {fetchAccounts} from '../../http/accountAPI';
import {setAccountsAC} from '../../redux/accountReducer';
import AccountPanel from './AccountPanel/AccountPanel';
import RecordPanel from './RecordPanel/RecordPanel';
import {fetchRecord} from '../../http/recordAPI';
import {setRecordAC} from '../../redux/recordReducer';
import {fetchCategory} from '../../http/categoryAPI';
import {setCategoryAC} from '../../redux/categoryReducer';

const Dashboard = () => {
  const user = useSelector(state => state.user.user)
  const accounts = useSelector(state => state.account.accounts)
  const [addAccountActive, setAddAccountActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAccounts(user.id).then(data => {
      dispatch(setAccountsAC(data))
    })
    fetchCategory().then(data => {
      dispatch(setCategoryAC(data))
    })
    fetchRecord(user.id, null, 5, 1).then(data => {
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
    <div className={style.fon}>
      <AddAccountModal setActive={setAddAccountActive} active={addAccountActive}/>
      <div className={style.flex}>
        {
          accounts.length === 0 ? null :
            accounts.map(acc => (
              <Cards key={acc.id} accountData={acc}/>
              ))
        }
        <AddButton onClick={setAddAccountActive}/>
      </div>
      <div style={{display: 'flex'}} >
        <AccountPanel/>
        <RecordPanel/>
        {/*<Panel name={'Структура расходов'}/>*/}

      </div>

    </div>

  )
    ;
};

export default Dashboard;