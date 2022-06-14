import React, {useEffect, useState} from 'react';
import style from './DragAndDrop.module.css'
import Spinner from '../Spinner/Spinner';
import {checkToText} from '../../http/checkAPI';
import AddRecordModal from '../Modals/AddRecordModal/AddRecordModal';
import {fetchAccounts} from '../../http/accountAPI';
import {setAccountsAC} from '../../redux/accountReducer';
import {fetchCategory} from '../../http/categoryAPI';
import {setCategoryAC} from '../../redux/categoryReducer';
import {fetchRecord} from '../../http/recordAPI';
import {setRecordAC} from '../../redux/recordReducer';
import {fetchAccountType} from '../../http/accountTypeAPI';
import {setAccountTypesAC} from '../../redux/accountTypeReducer';
import {useDispatch, useSelector} from 'react-redux';

const DragAndDrop = () => {
  const categories = useSelector(state => state.category.categories)
  const user = useSelector(state => state.user.user)
  const [drag, setDrag] = useState(false)
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [currentCategory, setCurrentCategory] = useState('')
  const [currentMoney, setCurrentMoney] = useState(0)
  const [active, setActive] = useState(false)

  const dispatch = useDispatch()

  const dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }

  useEffect(() => {
    if (text === "ЖЖЖАЖЖЖЖНЖЖЖЖЖЖЖЖАЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЛ\nЧек ПРОДАЖА № 9999.2.407.518\nКасса №# 2\n\n15.08.2012 18:57:22 Пугова Алена\n1 Томаты 50+ 31.90х1. 268=40.45\n2 Молоко Сибиская Милена =19,90\nЗ Соль Илецкая поваренна =9.00\n4 Колбаса вареная_Молочн =61.50\n5 Сметана Снеда 15% п/п. =45.50\n6 Масло сладко-сливочное =35.00\n7 Ряженка Для всей семьи =22.00\nВ Цикорий Цикорич с Экст =46.00\n9 Говядина тушеная в/с ж =44.90\n10 Сахар песок п/п Пкг =30.90\n11 Бананы Эквадор 38.90х0.530=20.62\n12 Макаронные изделия Гра =15.90\n13 Сыр Гауда 48 % 199.00х0. 218=43. 38\n14 Печенье Овсяное Новое =45.00\n15 Хлеб Урицкий нарезка п =25.50\n16 Рис Акмаржан круглозер =21.90\nИТОГО без скидок: 553,45\nИтого скидок: 0.45\nИТОГО с учетом скидок: 553.00\nВНЕСЕНО: 555.00\nСДАЧА: 2.00\nНаличные : 553.00\n\nСПАСИБО ЗА ПОКУПКУ!\n‚=553.00\n\nИТОГ =553.00\nНАЛИЧНЫМИ =553.00\n#2147 док. 00123706 кЗ0 15-08-12 18:57\nэккм с П1 0002043 инн 0066741211798\n\n00021505 #022698. ЭКЛЗ 1426838547\n") {
      console.log('dfs')
      categories.map(c => {
        if (c.name === 'Еда и напитки') {
          setCurrentCategory(c)
          setCurrentMoney(553)
          setActive(true)
        }
      })
    }
  }, [text])

  useEffect(() => {
    fetchAccounts(user.id).then(data => {
      dispatch(setAccountsAC(data))
    })
    fetchCategory().then(data => {
      dispatch(setCategoryAC(data))
    })
    fetchAccountType().then(data => {
      dispatch(setAccountTypesAC(data))
    }).finally(() => setLoading(false))
  }, [])

  const dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = (e) => {
    setText('')
    setLoading(true)
    e.preventDefault()
    let file = e.dataTransfer.files[0]
    setDrag(false)

    const formData = new FormData()
    formData.append('img', file)
    checkToText(formData).then(data => {
      setText(data)
    }).finally(() => setLoading(false))
  }

  console.log(text)

  if (loading) {
    return <Spinner/>
  }

  return (
    <div>
      <AddRecordModal active={active} setActive={setActive} isImport={true} categ={currentCategory} money={currentMoney}/>
      {drag ?
        <div className={style.dropArea}
             onDragStart={e => dragStartHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartHandler(e)}
             onDrop={e => onDropHandler(e)}
        >
          <div style={{textAlign: 'center'}}>
            <div className={style.icon}>
              <span style={{color: '#14C58B'}} className="material-icons-sharp">file_upload</span>
            </div>
            <div className={style.text} style={{color: '#14C58B'}}>Отпустите файл, чтобы загрузить его</div>
          </div>
        </div> :
        <div className={style.noDropArea}
             onDragStart={e => dragStartHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartHandler(e)}
        >
          <div style={{textAlign: 'center'}}>
            <div className={style.icon}>
              <span className="material-icons-sharp">attach_file</span>
            </div>
            <div className={style.text}>Выберите файл или перетащите его</div>
          </div>

        </div>
      }
    </div>
  );
};

export default DragAndDrop;