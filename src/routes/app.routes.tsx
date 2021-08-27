import * as React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

const { Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes() {
        const theme = useTheme();

    return (

        <Navigator
        screenOptions={{
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: theme.colors.black,
            tabBarLabelPosition: 'beside-icon',
            tabBarStyle: {
                paddingVertical: Platform.OS === "android" ? 10 : 0,
                height: 88
            }
        }}
        >
            <Screen 
                name="Listagem"
                component={Dashboard}
                options={{ headerShown: false, tabBarIcon: (({ size, color }) => (
                    <MaterialIcons
                        name="format-list-bulleted"
                        size={size}
                        color={color}
                    />
                ))
            }}
            />
            <Screen 
                name="Cadastrar"
                component={Register}
                options={{ headerShown: false, tabBarIcon: (({ size, color }) => (
                    <MaterialIcons
                        name="attach-money"
                        size={size}
                        color={color}
                    />
                ))
            }}
            />
            <Screen 
                name="Resumo"
                component={Register}
                options={{ headerShown: false, tabBarIcon: (({ size, color }) => (
                    <MaterialIcons
                        name="pie-chart"
                        size={size}
                        color={color}
                    />
                ))
            }}
            />
        </Navigator>
    )
}