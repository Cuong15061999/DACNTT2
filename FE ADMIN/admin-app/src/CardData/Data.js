import { UilUsersAlt, UilNewspaper, UilBookAlt} from '@iconscout/react-unicons'

//side bar data
export const CardData = [
    {
        Title: "News User",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 50,
        value: "10,000",
        icon: UilUsersAlt,
        series: [
            {
                name: "User",
                data: [5, 10, 20, 50, 25]
            },
        ],
    },
    {
        Title: "NewsPaper",
        color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 50,
        value: "10,000",
        icon: UilNewspaper,
        series: [
            {
                name: "NewsPaper",
                data: [5, 10, 20, 50, 70]
            },
        ],
    },
    {
        Title: "News",
        color: {
            backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 50,
        value: "10,000",
        icon: UilBookAlt,
        series: [
            {
                name: "News",
                data: [100, 200, 300, 400, 500]
            },
        ],
    }
]