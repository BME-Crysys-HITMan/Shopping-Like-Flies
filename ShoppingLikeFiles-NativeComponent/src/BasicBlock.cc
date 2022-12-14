// MIT License
//
// Copyright (c) 2022 BME-Crysys-HITMan
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

//
// Created by Daniel Abraham <daniel.abraham@edu.bme.hu> on 11/6/2022.
//

#include "BasicBlock.h"

void BasicBlock::setData(const char *data) {
    this->data = std::make_unique<unsigned char[]>(this->contentSize.getValue());
    for (std::size_t i = 0; i < this->contentSize.getValue(); ++i) {
        this->data[i] = static_cast<unsigned char>(data[i]);
    }
}

void BasicBlock::setData(std::unique_ptr<unsigned char[]> ptr) {
    this->data = std::move(ptr);
}

BasicBlock::BasicBlock(std::unique_ptr<unsigned char[]> ptr) {
    this->data = std::move(ptr);
}

BasicBlock::BasicBlock(const char *data, uint64_t size) {
    this->contentSize = NativeComponent::Types::INT64(size);
    this->setData(data);
}

BasicBlock::BasicBlock(std::unique_ptr<unsigned char[]> ptr, uint64_t size) {
    this->data = std::move(ptr);
    this->contentSize = size;
}
