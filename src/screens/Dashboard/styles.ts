import { RFPercentage } from "react-native-responsive-fontsize";

import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)};

    background-color: ${({ theme }) => theme.colors.primary};
`;