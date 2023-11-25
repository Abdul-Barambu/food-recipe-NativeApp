import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/Loading';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import YoutubeIframe from 'react-native-youtube-iframe';

export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const [isFavorite, setIsFavorite] = useState(false)
  const navigation = useNavigation()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMealData(item.idMeal)
  })

  // recipes
  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      // console.log(response.data)
      if (response && response.data) {
        setMeal(response.data.meals[0])
        setLoading(false)
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }

    return indexes
  }

  const getYoutubeVideo = url => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if(match && match[1]){
      return match[1];
    }

    return null;
  }


  return (
    <ScrollView className="bg-white flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <Image source={{ uri: item.strMealThumb }}
          style={{ width: wp(100), height: hp(50), borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} sharedTransitionTag={item.strMeal} />
      </View>
      {/* Back button */}
      <View className=" w-full absolute flex-row justify-between items-center pt-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1 rounded-full ml-5 bg-white">
          <Ionicons name="chevron-back" size={hp(4.5)} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className="p-2 rounded-full mr-5 bg-white">
          <Ionicons name="ios-heart" size={hp(3.5)} color={isFavorite ? "red" : "gray"} />
        </TouchableOpacity>
      </View>

      {/* Meal description */}
      {
        loading ? (<Loading size='medium' className="mt-16" color="#FFCA28" />) : (
          <View className="px-4 justify-between space-y-4 pt-8">
            {/* Name and Area */}
            <View className="space-y-2">
              <Text className="font-bold flex-1 text-neutral-700" style={{ fontSize: hp(3) }}>
                {meal?.strMeal}
              </Text>
              <Text className="font-medium flex-1 text-neutral-500" style={{ fontSize: hp(2) }}>
                {meal?.strArea}
              </Text>
              {/* miscelleneous */}
              <View className="flex-row justify-around">
                <View className="flex rounded-full bg-amber-300 p-2">
                  {/* Icons */}
                  <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex justify-center items-center">
                    <AntDesign name="clockcircleo" size={hp(4)} color="#525252" />
                  </View>
                  {/* icon text */}
                  <View className="flex items-center py-2 space-y-2">
                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">35</Text>
                    <Text style={{ fontSize: hp(1.5) }} className="font-bold text-neutral-700">Mins</Text>
                  </View>
                </View>

                <View className="flex rounded-full bg-amber-300 p-2">
                  {/* Icons */}
                  <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex justify-center items-center">
                    <FontAwesome5 name="user-friends" size={hp(3.5)} color="#525252" />
                  </View>
                  {/* icon text */}
                  <View className="flex items-center py-2 space-y-2">
                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">03</Text>
                    <Text style={{ fontSize: hp(1.5) }} className="font-bold text-neutral-700">Servings</Text>
                  </View>
                </View>

                <View className="flex rounded-full bg-amber-300 p-2">
                  {/* Icons */}
                  <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex justify-center items-center">
                    <FontAwesome5 name="fire-alt" size={hp(3.5)} color="#525252" />
                  </View>
                  {/* icon text */}
                  <View className="flex items-center py-2 space-y-2">
                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">103</Text>
                    <Text style={{ fontSize: hp(1.5) }} className="font-bold text-neutral-700">Cal</Text>
                  </View>
                </View>

                <View className="flex rounded-full bg-amber-300 p-2">
                  {/* Icons */}
                  <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex justify-center items-center">
                    <Octicons name="stack" size={hp(3.5)} color="#525252" />
                  </View>
                  {/* icon text */}
                  <View className="flex items-center py-2 space-y-2">
                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700"></Text>
                    <Text style={{ fontSize: hp(1.5) }} className="font-bold text-neutral-700">Easy</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* ingredients */}
            <View className="space-y-4">
              <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                Ingredients
              </Text>
              <View className="space-y-2 ml-3">
                {
                  ingredientsIndexes(meal).map(i => {
                    return (
                      <View key={i} className="flex-row space-x-4">
                        <View style={{ height: hp(1.5), width: hp(1.5) }} className="bg-amber-300 rounded-full" />
                        <View className="flex-row space-x-2">
                          <Text style={{ fontSize: hp(1.7) }} className="font-medium text-neutral-600">{meal['strIngredient' + i]}</Text>
                          <Text style={{ fontSize: hp(1.7) }} className="font-extrabold text-neutral-700">{meal['strMeasure' + i]}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </View>

            {/* instruction */}
            <View className="space-y-4">
              <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                Instructions
              </Text>
              <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                {
                  meal?.strInstructions
                }
              </Text>
            </View>

            {/* recipe video */}
            {
              meal.strYoutube && (
                <View className="space-y-2">
                  <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                    Recipe Video
                  </Text>
                  <View>
                    <YoutubeIframe videoId={getYoutubeVideo(meal.strYoutube)} height={hp(30)} />
                  </View>
                </View>
              )
            }
          </View>
        )
      }
    </ScrollView>
  )
}