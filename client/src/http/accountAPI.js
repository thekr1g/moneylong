import {$authHost} from './index';

export const createAccount = async (name, color, userId, money, accountTypeId) => {
  const {data} = await $authHost.post('/api/account', {name, color, userId, money, accountTypeId})
  return data
}

export const fetchAccounts = async (userId) => {
  const {data} = await $authHost.get('api/account', {params: {userId}})
  return data
}

export const updateAccount = async (id, name, color, money, accountTypeId) => {
  const {data} = await $authHost.put('api/account', {id, name, color, money, accountTypeId})
  return data
}

