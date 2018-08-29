using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarManageSystem.Model
{
    /// <summary>
    /// 异步TcpListener TCP服务器事件参数类 
    /// </summary>
    public class AsyncEventArgs : EventArgs
    {
        /// <summary>
        /// 提示信息
        /// </summary>
        public string _msg;

        /// <summary>
        /// 每次缓冲的数据
        /// </summary>
        public byte[] _buff;

        /// <summary>
        /// 客户端状态封装类
        /// </summary>
        public TCPClientState _state;

        /// <summary>
        /// 是否已经处理过了
        /// </summary>
        public bool IsHandled { get; set; }

        public AsyncEventArgs(string msg)
        {
            this._msg = msg;
            IsHandled = false;
        }
        public AsyncEventArgs(TCPClientState state)
        {
            this._state = state;
            IsHandled = false;
        }
        public AsyncEventArgs(TCPClientState state,byte[] buff)
        {
            this._buff = buff;
            this._state = state;
            IsHandled = false;
        }
        public AsyncEventArgs(string msg, TCPClientState state)
        {
            this._msg = msg;
            this._state = state;
            IsHandled = false;
        }
    }
}
