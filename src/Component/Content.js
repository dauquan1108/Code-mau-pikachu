import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../Redux/Actions/index";
import "./../App.css";
import logo from "../icon/logo.png";
import image from "../icon/images.jpeg";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkHandler: 10,
      time: 730,
      checkReset: "off",
    };
  }

  resetGame = (checkReset) => {
    this.setState({
      checkReset: checkReset,
    });
  };

  checkHandleArrSwap = (list) => {
    const { checkSwapArr } = this.props;
    const { checkHandler } = this.state;
    let handleLimit = checkHandler - 1;
    this.setState({
      checkHandler: handleLimit,
    });
    if (handleLimit < 0) {
      alert("HẾT LƯỢT ĐẢO");
      this.setState({
        checkHandler: 0,
      });
    } else {
      checkSwapArr(list);
    }
  };

  handleTime = (checkReset) => {
    this.setState({
      checkReset: checkReset,
    });
    setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, 200);
  };

  changeStatusItem = (arr, list, item, index, indexitem) => {
    const { checkButtonClick } = this.props;
    // debugger;
    console.log({ arr }, { list }, { item }, { index }, { indexitem });
    checkButtonClick(arr, list, item, index, indexitem);
  };

  render() {
    const { list } = this.props;
    // console.log({ list });
    let { checkHandler, time, checkReset } = this.state;
    if (time < 0)
      return (
        <div style={{ textAlign: "center", display: "block" }}>
          <p>HẾT GIỜ !!!</p>
          <img src={image} alt="#" />
          <div>
            <button> CHƠI LẠI </button>
          </div>
        </div>
      );
    return (
      <div style={{ display: "block", marginLeft: "120px" }}>
        <div style={{ textAlign: "center" }}>
          <img style={{ border: "1 solid" }} src={logo} alt="#" />
        </div>
        <div className="content" style={{ textAlign: "center" }}>
          <div
            style={{
              marginRight: "10px",
              fontSize: "30px",
              color: "#EE0000",
              fontFamily: "Debby",
            }}
          >
            <div
              style={{
                textAlign: "left",
                marginLeft: "500px",
                marginBottom: "30px",
              }}
            >
              <button
                style={{
                  color: "#CCFF00",
                  backgroundColor: "crimson",
                  fontFamily: "Courier New",
                  margin: " 10px",
                }}
                onClick={() => this.handleTime("on")}
              >
                START <div>GAME</div>
              </button>
              <button
                style={{
                  color: "#CCFF00",
                  backgroundColor: "crimson",
                  fontFamily: "Courier New",
                  margin: " 10px",
                }}
                onClick={() => this.checkHandleArrSwap(list)}
              >
                LÀM MỚI HÌNH
                <div>{checkHandler}</div>
              </button>
              <button
                style={{
                  color: "#CCFF00",
                  backgroundColor: "crimson",
                  fontFamily: "Courier New",
                  margin: " 10px",
                }}
                onClick={() => this.resetGame("on")}
              >
                RESET <div>GAME</div>
              </button>
            </div>
            {list.map((arr, index) => {
              return (
                <div key={index} className="row">
                  {arr.map((item, indexitem) => {
                    if (checkReset === "on")
                      return (
                        <div
                          key={indexitem}
                          style={
                            item.status === false
                              ? { display: "inline-block" }
                              : {
                                  display: "inline-block",
                                  opacity: 0,
                                  transition: "opacity 0.2s ease-in",
                                }
                          }
                        >
                          <div style={{ width: "62px", height: "62px" }}>
                            <button
                              style={{ border: "2px solid" }}
                              onClick={() =>
                                this.changeStatusItem(
                                  arr,
                                  list,
                                  item,
                                  index,
                                  indexitem
                                )
                              }
                              disabled={item.status}
                            >
                              <img
                                style={{ width: "47px", height: "54px" }}
                                src={item.img}
                                alt="error"
                              />
                            </button>
                          </div>
                        </div>
                      );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            marginLeft: "500px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid",
              width: "730px",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: `${time}px`,
                height: "30px",
                backgroundColor: "#7CFC00",
                textAlign: "center",
                lineHeight: "30px",
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            >
              {" "}
              TIME
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newState: (index, indexitem) =>
      dispatch(action.changeStatusIcon(index, indexitem)),
    checkButtonClick: (arr, list, item, index, indexitem, point) =>
      dispatch(action.checkButton(arr, list, item, index, indexitem, point)),
    checkSwapArr: (list) => dispatch(action.swapArr(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
