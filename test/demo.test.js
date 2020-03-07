/**
 * @description test demo
 * @author 綦旭
 */
function sum(a,b){
    return a + b
}
test('10 加上20 应该等于 30',()=>{
    const res = sum(10,20)
    expect(res).toBe(30)
})