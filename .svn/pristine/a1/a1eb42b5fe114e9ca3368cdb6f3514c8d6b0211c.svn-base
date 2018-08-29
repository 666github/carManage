using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace JT808.Messages
{
    class ParameterMessage
    {
    }

    /// <summary>
    /// 查询终端参数
    /// </summary>
    [MessageType(NoBody = true, ID = 0x8104)]
    public class QueryClientMessage
    {
    }

    /// <summary>
    /// 查询终端参数应答
    /// </summary>
    [MessageType(0x0104)]
    class ClientResponse
    {
        /// <summary>
        /// 应答流水号 (对应的终端消息的流水号)
        /// </summary>
        [UInt16Handler]
        public ushort No { get; set; }
        /// <summary>
		/// 应答参数个数  (对应的终端消息的 ID )
		/// </summary>
		[ByteHandler]
        public byte ParamCount { get; set; }
        /// <summary>
        /// 参数列表 
        /// </summary>
        [ParamListHandler(typeof(ParamsList))]
        public ParamsList Params { get; set; } = new ParamsList();
    }

    /// <summary>
    /// 设置终端参数
    /// </summary>
    [MessageType(ID = 0x8103)]
    public class SetClientParam
    {
        /// <summary>
        /// 参数总数
        /// </summary>
        [ByteHandler]
        public byte ParamCount { get; set; }
        /// <summary>
        /// 参数列表 
        /// </summary>
        [ParamListHandler(typeof(ParamsList))]
        public ParamsList Params { get; set; }
    }



    /// <summary>
    /// 参数列表类
    /// </summary>
    public class ParamsList : IBitCustomType
    {
        public List<ParamObject> Params { get; set; }
        
        public void Load(object value)
        {
            Params = (List<ParamObject>)value;
        }

        public object Save()
        {
            var id1 = intToBytes(Params[0].ID);
            var value1 = Encoding.GetEncoding("GBK").GetBytes((string)Params[0].Value);
            var length1 = (byte)value1.Length;

            var id2 = intToBytes(Params[1].ID);
            var value2 = intToBytes(Convert.ToUInt32(Params[1].Value));
            var length2= Params[1].Length;

            var res = new byte[id1.Length+value1.Length+id2.Length+value2.Length+2];

            for (int i = 0; i < 4; i++)
            {
                res[i] = id1[i];
            }
            res[4] = length1;
            for (int i = 0; i < value1.Length; i++)
            {
                res[i+5] = value1[i];
            }

            for (int i = 0;i<4;i++)
            {
                res[i+5+ value1.Length] = id2[i];
            }

            res[value1.Length+9] = length2;
            for(int i=0;i<4;i++)
            {
                res[value1.Length + 10+i] = value2[i];
            }
            return res;
        }

        public static byte[] intToBytes(uint value)
        {
            byte[] src = new byte[4];
            src[0] = (byte)((value >> 24) & 0xFF);
            src[1] = (byte)((value >> 16) & 0xFF);
            src[2] = (byte)((value >> 8) & 0xFF);
            src[3] = (byte)(value & 0xFF);
            return src;
        }
    }


    public class ParamObject
    {
        public uint ID { get; set; }
        public byte Length { get; set; }
        public object Value { get; set; }
    }


}
