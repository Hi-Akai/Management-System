//封装一个函数用于区分：早上|上午|中午|下午|晚上
export const getTime = () => {
  let msg = ''
  const hours = new Date().getHours()
  if (hours <= 9) {
    msg = '早上'
  } else if (hours <= 11) {
    msg = '上午'
  } else if (hours <= 13) {
    msg = '中午'
  } else if (hours <= 19) {
    msg = '下午'
  } else {
    msg = '晚上'
  }
  return msg
}
