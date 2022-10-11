/**
 * 配置规则：
 * （1）'$'符号开头的合法变量名
 * （2）配置环境变量固定变量名为：$env
 * （3）如果变量的值为null,undefined,''或0，则不会进行属性的添加（覆盖）
 */
$env = 'prod'

$baseUrl = `http://localhost:8080`
$prodUrl = `http://192.168.153.41:9000`
