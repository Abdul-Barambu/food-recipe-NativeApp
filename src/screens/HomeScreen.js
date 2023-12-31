import { View, Text, StatusBar, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon } from 'react-native-heroicons/outline'
import { Feather } from '@expo/vector-icons';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([])
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes()
  }, [])


  // handle change cateories
  const handleChangeCategory = (category) => {
    getRecipes(category)
    setActiveCategory(category)
    setRecipes([])
  }


  // cateories
  useEffect(() => {
    axios.get("https://themealdb.com/api/json/v1/1/categories.php")
      .then(res => {
        setCategories(res.data.categories)
      }).catch((e) => {
        console.log(e)
      })
  }, [])


  // recipes
  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log(response.data)
      if (response && response.data) {
        setRecipes(response.data.meals)
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }


  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-5">

        {/* Avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../../assets/images/avatar.png')} style={{ height: hp(5), width: hp(5.5) }} />
          <BellIcon size={hp(4)} color={'gray'} />
        </View>

        {/* greetings and puncline */}
        <View className="mx-4 space-y-1 mb-2">
          <Text className="text-neutral-600" style={{ fontSize: hp(2) }}>Hello, Abdul!</Text>
          <View>
            <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.8) }}>Make your own food,</Text>
          </View>
          <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.8) }}>
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput placeholder='Search any recipe' placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <TouchableOpacity>
              <Feather name="search" size={hp(2.5)} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        {/* recipes */}
        <View>
          <Recipes categories={categories} recipes={recipes} setRecipes={setRecipes} />
        </View>

      </ScrollView>
    </View>
  )
}