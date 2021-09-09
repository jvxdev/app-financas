import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';

const { Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes() {
        const theme = useTheme();

    return (

        <Navigator
        screenOptions={{
            tabBarActiveTintColor: theme.colors.black,
            tabBarInactiveTintColor: theme.colors.text,
            tabBarLabelPosition: 'beside-icon',
            tabBarStyle: {
                height: 50
            },
            headerShown: false
        }}
        >
            <Screen 
                name="LISTAGEM"
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
                name="CADASTRAR"
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
                name="RESUMO"
                component={Resume}
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
    );
}