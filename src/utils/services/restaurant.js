import { createDocument, getDocuments } from "../api-lib"
import { getCurrentUser } from "../firebase"

const RESTAURANT_COLLECTION = 'restaurant'

export const createRestaurant = async (name, location) => {
    const restaurantData = { name, location }
    const user = getCurrentUser()
    return await createDocument(RESTAURANT_COLLECTION, restaurantData, user)
}

export const getRestaurants = async () => {
    const user = getCurrentUser()
    return await getDocuments(RESTAURANT_COLLECTION, user)
}