import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export const TABS = ["Harian", "Mingguan", "Bulanan"];

export const transactions = [
  {
    id: "1",
    date: "Senin, 3/10",
    type: "Pendapatan",
    amount: "Rp3.000.000",
    category: "Gaji Bulanan",
    description: "Uang dari bos",
    icon: <MaterialIcons name="attach-money" size={24} color="white" />,
    color: "#00BE2C",
  },
  {
    id: "2",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "3",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "4",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "5",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "6",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
];

export const expenseCategories = [
  {
    title: "Makanan",
    value: "makanan",
    icon: <FontAwesome6 name="bowl-food" size={24} color="#00027d" />,
  },
  {
    title: "Sehari-hari",
    value: "sehari-hari",
    icon: <FontAwesome6 name="cart-shopping" size={24} color="#00027d" />,
  },
  {
    title: "Transportasi",
    value: "transportasi",
    icon: <MaterialIcons name="commute" size={24} color="#00027d" />,
  },
  {
    title: "Sosial",
    value: "sosial",
    icon: <FontAwesome6 name="users" size={24} color="#00027d" />,
  },
  {
    title: "Perumahan",
    value: "perumahan",
    icon: <Feather name="home" size={24} color="#00027d" />,
  },
  {
    title: "Hadiah",
    value: "hadiah",
    icon: <FontAwesome6 name="gift" size={24} color="#00027d" />,
  },
  {
    title: "Komunikasi",
    value: "komunikasi",
    icon: <Feather name="message-square" size={24} color="#00027d" />,
  },
  {
    title: "Pakaian",
    value: "pakaian",
    icon: <FontAwesome6 name="shirt" size={24} color="#00027d" />,
  },
  {
    title: "Hiburan",
    value: "hiburan",
    icon: <Ionicons name="tv" size={24} color="#00027d" />,
  },
  {
    title: "Tampilan",
    value: "tampilan",
    icon: <MaterialCommunityIcons name="mirror" size={24} color="black" />,
  },
  {
    title: "Kesehatan",
    value: "kesehatan",
    icon: <FontAwesome6 name="heart-pulse" size={24} color="#00027d" />,
  },
  {
    title: "Pajak",
    value: "pajak",
    icon: <FontAwesome6 name="file-invoice-dollar" size={24} color="#00027d" />,
  },
  {
    title: "Pendidikan",
    value: "pendidikan",
    icon: <FontAwesome6 name="graduation-cap" size={24} color="#00027d" />,
  },
  {
    title: "Investasi",
    value: "investasi",
    icon: <Feather name="trending-up" size={24} color="#00027d" />,
  },
  {
    title: "Peliharaan",
    value: "peliharaan",
    icon: <FontAwesome6 name="paw" size={24} color="#00027d" />,
  },
  {
    title: "Liburan",
    value: "liburan",
    icon: <FontAwesome6 name="umbrella-beach" size={24} color="#00027d" />,
  },
];

export const incomeCategories = [
  {
    title: "Gaji",
    value: "gaji",
    icon: <FontAwesome6 name="money-bill" size={24} color="#00027d" />,
  },
  {
    title: "Bonus",
    value: "bonus",
    icon: <FontAwesome6 name="money-check-dollar" size={24} color="#00027d" />,
  },
  {
    title: "Investasi",
    value: "investasi",
    icon: <Feather name="trending-up" size={24} color="#00027d" />,
  },
  {
    title: "Part Time",
    value: "part time",
    icon: <MaterialIcons name="work-outline" size={24} color="#00027d" />,
  },
];
