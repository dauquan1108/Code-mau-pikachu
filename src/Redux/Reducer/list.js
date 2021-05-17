import * as types from './../Constant/types'
import icon1 from '../../icon/1.png'
import icon2 from '../../icon/2.png'
import icon3 from '../../icon/3.png'
import icon4 from '../../icon/4.png'
import icon5 from '../../icon/5.png'
import icon6 from '../../icon/6.png'
import icon7 from '../../icon/7.png'
import icon8 from '../../icon/8.png'
import icon9 from '../../icon/9.png'
import icon10 from '../../icon/10.png'
import icon11 from '../../icon/11.png'
import icon12 from '../../icon/12.png'
import icon13 from '../../icon/13.png'
import icon14 from '../../icon/14.png'
import icon15 from '../../icon/15.png'
import icon16 from '../../icon/16.png'
import icon17 from '../../icon/17.png'
import icon18 from '../../icon/18.png'
import icon19 from '../../icon/19.png'
import icon20 from '../../icon/20.png'
import icon21 from '../../icon/21.png'

const init = [
    {
        id: 0,
        img: icon1,
        check: 0
    },
    {
        id: 1,
        img: icon2,
        check: 0
    },
    {
        id: 2,
        img: icon3,
        check: 0
    },
    {
        id: 3,
        img: icon4,
        check: 0
    },
    {
        id: 4,
        img: icon5,
        check: 0
    },
    {
        id: 5,
        img: icon6,
        check: 0
    },
    {
        id: 6,
        img: icon7,
        check: 0
    },
    {
        id: 7,
        img: icon8,
        check: 0
    },
    {
        id: 8,
        img: icon9,
        check: 0
    },
    {
        id: 9,
        img: icon10,
        check: 0
    },
    {
        id: 10,
        img: icon11,
        check: 0
    },
    {
        id: 11,
        img: icon12,
        check: 0
    },
    {
        id: 12,
        img: icon13,
        check: 0
    },
    {
        id: 13,
        img: icon14,
        check: 0
    },
    {
        id: 14,
        img: icon15,
        check: 0
    },
    {
        id: 15,
        img: icon16,
        check: 0
    },
    {
        id: 16,
        img: icon17,
        check: 0
    },
    {
        id: 17,
        img: icon18,
        check: 0
    },
    {
        id: 18,
        img: icon19,
        check: 0
    },
    {
        id: 19,
        img: icon20,
        check: 0
    },
    {
        id: 20,
        img: icon21,
        check: 0
    },
];

const cols = 12;
const rows = 7;
const limit = 4;

const setState = (initialState) => {
    for(let i = 0; i < cols; i++) {
        const random = Math.floor(Math.random() * init.length);
        const item = init[random];
        initialState.push ({
            id: item.id,
            status: false,
            img: item.img,
            check: item.check,
            road: false,
        });
        item.check++;
        if(item.check === limit) {
            init.splice(random, 1);
        }
    }
    return initialState;
}

const setStateTwo = (initialStateTwo) => {
    for(let i = 0; i < rows; i++) {
        const array = setState([]);
        initialStateTwo.push(array);
    }
    return initialStateTwo;
}

const newState = setStateTwo([]);
let mount = 0;
console.log(mount);

const tasks = (state = newState , action) => {
    switch (action.type){
        case types.viewList:
            return state;
        case types.changeStatus:
            state[action.index][action.indexitem].status = !state[action.index][action.indexitem].status;
            return [...state];
        case types.checkTwoButton:
            return [...state];
        case types.changStatusTrue:
            state[action.checkObj[0].index][action.checkObj[0].indexItem].status = true;
            state[action.checkObj[1].index][action.checkObj[1].indexItem].status = true;
            return [...state];
        case types.handleArr:
            const newStateSwap = [];
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 12; j++) {
                    if(state[i][j].status === false) {
                        newStateSwap.push(state[i][j]);
                    }
                }
            }
            for (let i = newStateSwap.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newStateSwap[i], newStateSwap[j]] = [newStateSwap[j], newStateSwap[i]];
            }
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 12; j++) {
                    if (state[i][j].status === false) {
                        state[i][j] = newStateSwap[0];
                        newStateSwap.splice(0, 1);
                    }
                }
            }
            return [...state];
        default: return state;
    }
}

export default tasks;
