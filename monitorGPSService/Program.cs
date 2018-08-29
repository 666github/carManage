﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace monitorGPSService
{
    class Program
    {
        static void Main(string[] args)
        {
            TcpClient tcpClient = new TcpClient("222.186.170.64", 26563);
            NetworkStream stream = null;
            try
            {
                stream = tcpClient.GetStream();
                string token = "MZTKNMZTKN123321";
                byte[] data = Encoding.UTF8.GetBytes(token);
                stream.Write(data, 0, data.Length);
            }
            catch (Exception ex)
            {
                Console.WriteLine("连不上:" + ex.Message);
                Console.ReadLine();
                return;
            }

            while (true)
            {
                try
                {
                    byte[] ret = new byte[1024];
                    int length = stream.Read(ret, 0, 1024);
                    string message1 = Encoding.UTF8.GetString(ret, 0, length);
                    Console.WriteLine("返回：" + message1);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("接收信息时返回错误:" + ex.Message);
                    Console.ReadLine();
                    break;
                }
            }
            stream.Close();
            tcpClient.Close();
        }
    }
}
