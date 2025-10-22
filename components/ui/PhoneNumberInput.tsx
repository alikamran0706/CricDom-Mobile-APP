// components/PhoneNumberInput.tsx

import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';

interface Props {
    value: string;
    onChange: (val: string) => void;
    label: string;
    required: boolean;
    placeholder: string;
}

const PhoneNumberInput: React.FC<Props> = ({ value, onChange, label, required, placeholder }) => {
    const [countryCode, setCountryCode] = useState<CountryCode>('US');
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [countryPickerVisible, setCountryPickerVisible] = useState(false);
    const phoneInputRef = useRef<PhoneInput>(null);

    useEffect(() => {
        if (phoneInputRef.current) {
            phoneInputRef.current.selectCountry(countryCode.toLowerCase());
        }
    }, [countryCode]);

    const onSelectCountry = (country: Country) => {
        setCountryCode(country.cca2);
        setSelectedCountry(country);
        setCountryPickerVisible(false);
        if (phoneInputRef.current) {
            phoneInputRef.current.selectCountry(country.cca2.toLowerCase());
        }
    };

    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };

    return (
        <View>
            <Text className="text-base font-medium text-gray-800 mb-2">
                {label} {required && <Text className="text-red-600"> *</Text>}
            </Text>

            <PhoneInput
                ref={phoneInputRef}
                initialCountry={countryCode.toLowerCase()}
                onChangePhoneNumber={onChange}
                onPressFlag={toggleCountryPicker}
                textProps={{ placeholder: placeholder }}
                style={styles.phoneInput}
                textStyle={styles.phoneInputText}
            // value={value}
            />

            {countryPickerVisible && (
                <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withFlagButton={false}
                    withCountryNameButton={false}
                    onSelect={onSelectCountry}
                    onClose={() => setCountryPickerVisible(false)}
                    visible={countryPickerVisible}
                />
            )}
        </View>
    );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
    phoneInput: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#C0C0C0',
        height: 50,
        padding: 5,
        marginBottom: 20,
    },
    phoneInputText: {
        color: 'black',
    },
});
