// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');

function serialize_User_UserRequest(arg) {
  if (!(arg instanceof user_pb.UserRequest)) {
    throw new Error('Expected argument of type User.UserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_UserRequest(buffer_arg) {
  return user_pb.UserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_UserResponse(arg) {
  if (!(arg instanceof user_pb.UserResponse)) {
    throw new Error('Expected argument of type User.UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_UserResponse(buffer_arg) {
  return user_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserManageService = exports.UserManageService = {
  getUser: {
    path: '/User.UserManage/getUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserRequest,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_User_UserRequest,
    requestDeserialize: deserialize_User_UserRequest,
    responseSerialize: serialize_User_UserResponse,
    responseDeserialize: deserialize_User_UserResponse,
  },
};

exports.UserManageClient = grpc.makeGenericClientConstructor(UserManageService);
