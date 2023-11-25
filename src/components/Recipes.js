import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from "react-native-masonry-list";
import { mealData } from '../constant';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ categories, recipes }) {

    const navigation = useNavigation()

    return (
        <View className="mx-4 space-y-3">
            <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600 mb-2">Recipes</Text>
            {/* <View>
                <MasonryList
                    data={mealData}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
                    onEndReachedThreshold={0.1}
                />
            </View> */}
            {
                categories.length == 0 || recipes.length == 0 ? (
                    <Loading size="medium" className="mt-28" color="#FFCA28" />
                ) : (
                    <RecipeCard recipes={recipes} navigation={navigation} />
                )
            }
        </View>
    )
}

const RecipeCard = ({ index, recipes, navigation }) => {
    return (

        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {recipes.map((meal, index) => (
                <TouchableOpacity onPress={() => navigation.navigate("RecipeDetail", {...meal})} key={index} style={{ width: '50%', marginBottom: 16 }}>
                    <Image source={{ uri: meal.strMealThumb }} style={{ width: wp(44), height: hp(32), borderRadius: 35 }} sharedTransitionTag={meal.strMeal}  />
                    <Text style={{ fontSize: hp(1.6) }} className="pl-4">
                        {
                            meal.strMeal.length > 20 ? meal.strMeal.slice(0, 20) + "..." : meal.strMeal
                        }
                    </Text>
                </TouchableOpacity>
            ))}
        </Animated.View>
    )
}