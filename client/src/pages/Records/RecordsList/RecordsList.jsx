import React from 'react';
import {useSelector} from 'react-redux';
import RecordCard from '../../../components/RecordCard/RecordCard';
import style from './RecordList.module.css'

const RecordsList = () => {
  const records = useSelector(state => state.record.records)
  return (
    <div>
      <div>
        <div className={style.date}>Сегодня</div>
        {records.map(r =>
          {
            if (r.id > 5) {
              return  <RecordCard record={r} key={r.id}/>
            }
          }
        )}
      </div>
      <div>
        <div className={style.date}>Вчера</div>
        {records.map(r =>
          {
            if (r.id <= 5 && r.id > 2) {
              return  <RecordCard record={r} key={r.id}/>
            }
          }
        )}
      </div>
      <div>
        <div className={style.date}>14 июня</div>
        {records.map(r =>
          {
            if (r.id <= 2) {
              return  <RecordCard record={r} key={r.id}/>
            }
          }
        )}
      </div>
    </div>
  );
};

export default RecordsList;