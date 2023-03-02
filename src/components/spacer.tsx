import React from 'react'
import { View } from 'react-native'

interface Props {
    space: number
}

const Spacer = (props: Props) => {
    const { space } = props;
    return (
        <View style={{ padding: space }} />
    )
}

export default Spacer;