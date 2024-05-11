// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class TechnologysVacanciesService {
//   constructor(
//     @InjectRepository(VacancyToTechnology)
//     private readonly vacancy_TechnolyRepository: Repository<VacancyToTechnology>,
//   ) {}
//   // async findAll() {
//   //   try {
//   //     return this.vacancy_TechnolyRepository.find({
//   //       relations: { technology: true, vacancy: true },
//   //     });
//   //   } catch (err) {
//   //     console.log(err);

//   //     throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
//   //   }
//   // }
// }
