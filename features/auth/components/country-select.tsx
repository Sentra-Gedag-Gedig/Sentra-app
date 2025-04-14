import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { useCountries } from "@/features/auth/hooks/use-countries";
import { CountrySelectProps } from "../types/country";
import { handleSelectedCountry } from "../actions/country";

const CountrySelect = ({ onSelect }: CountrySelectProps) => {
  const { data } = useCountries();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    flag: string;
    dialCode: string;
  } | null>(null);

  useEffect(() => {
    if (!selectedCountry && data?.length) {
      const indonesia = data.find((c) => c.dialCode === "+62");
      if (indonesia) {
        handleSelect(indonesia);
      }
    }
  }, [data]);

  const handleSelect = async (country: { flag: string; dialCode: string }) => {
    const result = await handleSelectedCountry({
      country,
      onSelect,
    });
    setSelectedCountry(result.selected);
    setModalVisible(!result.shouldCloseModal);
  };

  return (
    <View className="w-1/4">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex flex-row items-center justify-center px-2 py-1 border border-[#CBCBCB] rounded-2xl mt-4 bg-gray-100"
      >
        {selectedCountry ? (
          <View className="flex flex-row items-center justify-center p-2">
            <Image
              source={{ uri: selectedCountry.flag }}
              style={{ width: 25, height: 25, marginRight: 10 }}
            />
            <Text>{selectedCountry.dialCode}</Text>
          </View>
        ) : (
          <Text>Memuat...</Text>
        )}
      </TouchableOpacity>

      {data && (
        <CountryModal
          visible={modalVisible}
          data={data}
          onSelect={handleSelect}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

export default CountrySelect;

export const CountryModal = ({
  visible,
  data,
  onSelect,
  onClose,
}: {
  visible: boolean;
  data: { flag: string; dialCode: string; region: string; name: string }[];
  onSelect: (country: {
    flag: string;
    dialCode: string;
    region: string;
    name: string;
  }) => void;
  onClose: () => void;
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.dialCode}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            key={`${item.dialCode}-${item.region}`}
            className="flex flex-row items-center p-3 border-b"
          >
            <Image
              source={{ uri: item.flag }}
              style={{ width: 30, height: 20, marginRight: 10 }}
            />
            <Text>{item.dialCode}</Text>
            <Text className="pl-4">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={onClose}
        className="p-4 bg-gray-200 text-center"
      >
        <Text>Tutup</Text>
      </TouchableOpacity>
    </Modal>
  );
};
