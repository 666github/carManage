using CarManageSystem.helper;
using SuperSocket.SocketBase.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarManageSystem.Service
{
    public class GPSReceiveFilter: IReceiveFilter<GPSRequestInfo>
    {
        public int LeftBufferSize { get; }

        public IReceiveFilter<GPSRequestInfo> NextReceiveFilter { get; }

        public FilterState State { get; }

        public GPSRequestInfo Filter(byte[] readBuffer, int offset, int length, bool toBeCopied, out int rest)
        {
            //Console.WriteLine(Encoding.UTF8.GetString(readBuffer));
            rest = 0;
            return new GPSRequestInfo { Key = Encoding.UTF8.GetString(readBuffer, offset, length), GpsData = ByteHelper.SubByte(readBuffer, offset, length) };
        }

        public void Reset()
        {

        }
    }
}
