import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Injectable } from '@nestjs/common';
  import { Usuario } from '../entities/usuario.entity';
  
//   validar si el valor es unico en la base de datos (para el campo username y email)
  @Injectable()
//   decorador para validar si el valor es unico en la base de datos
  @ValidatorConstraint({ async: true })
//   clase para validar si el valor es unico en la base de datos
  export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
      @InjectRepository(Usuario)
      private readonly usuarioRepository: Repository<Usuario>,
    ) {}
  
    // validar si el valor es unico en la base de datos
    async validate(value: any, args: ValidationArguments) {
      const [entityClass, property] = args.constraints;
      const entity = await this.usuarioRepository.findOne({ where: { [property]: value } });
      return !entity;
    }
  
    // mensaje de error si el valor no es unico en la base de datos
    defaultMessage(args: ValidationArguments) {
      return `${args.property} must be unique.`;
    }
  }
  
//   decorador para validar si el valor es unico en la base de datos
  export function IsUnique(
    entityClass: Function,
    property: string,
    validationOptions?: ValidationOptions,
  ) {
    // registrar el decorador
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [entityClass, property],
        validator: IsUniqueConstraint,
      });
    };
  }
  