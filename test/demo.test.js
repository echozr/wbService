/**
 * @description test demo
 * @author zr
 */
function sum(a, b) {
  return a + b
}

//
test('10+20 應該等於30', () => {
  const res = sum(10, 30)
  //expect(res).toBe(40)
  expect(res).not.toBe(30)
})