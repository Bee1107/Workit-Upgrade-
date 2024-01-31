
import { BASE_URL } from '../utils/constants'
import { get } from './method'

export const fetchCategories = () => get(`${BASE_URL}users/get-categories`)

export const fetchSubCategories = subCategoryId => get(`${BASE_URL}users/get-subcategories?category_id=${subCategoryId}`)
