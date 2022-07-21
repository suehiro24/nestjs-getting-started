import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Cat } from './interfaces/cat.interface';
import { CatsServiceBase } from './interfaces/cat-service.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { MyForbiddenException } from 'src/exceptions/my-forbidden.exception';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatControllerExceptionFilter } from 'src/cat-controller-exception.filter';

@UseFilters(CatControllerExceptionFilter)
@Controller('cats')
export class CatsController {
  constructor(
    // private catsService: CatsService<string>,
    private catsService: CatsServiceBase,
    @Inject('STRING_VAL_TOKEN') private strValToken: string,
  ) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    console.log(process.env.NODE_ENV);
    console.log(this.strValToken);
    return this.catsService.findAll();
  }

  @Get('simple-get')
  simpleGet(): string {
    return 'This action return all cats';
  }

  @Get('simple-redirect-to-docs')
  @Redirect('https://docs.nestjs.com', 302)
  simpleRedirect(@Query('version') version: string) {
    // Overwrite redirect url if specific query param is inputted.
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get('use-param-as-object/:id1/id2')
  useParamAsObject(@Param() params): string {
    return params.id;
  }

  @Get('use-param-as-strings/:id1/:id2')
  useParamAsStrings(@Param() params: string[]): string | string[] {
    // ??? params is passed as object ???
    // TODO: examination
    return params[0] ?? params;
  }

  @Get('use-param-directly/:id')
  useParamDirectly(@Param('id') id: string): string {
    return id;
  }

  @Get('throw-http-exception')
  async throwHttpException() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('throw-http-exception-override-entire-body')
  async throwHttpExceptionOverrideEntireBody() {
    throw new MyForbiddenException();
  }

  @Get('throw-http-exception-and-use-filter')
  // @UseFilters(new HttpExceptionFilter()) // instantiate manually
  @UseFilters(HttpExceptionFilter) // DI
  async throwHttpExceptionAndUseFilter() {
    throw new MyForbiddenException();
  }

  @Get('req-with-lib-specific-mode/:id')
  useParamWithLibrarySpecificMode(@Req() req: Request): string {
    return req.params.id;
  }

  @Get('res-with-lib-specific-mode')
  resWithLibrarySpecificMode(@Res() res: Response) {
    return res.status(HttpStatus.OK).json([]);
  }

  @Get('use-lib-specific-res-passthrough')
  useLibrarySpecificResWhileKeepingNestStandardRes(
    @Res({ passthrough: true }) res: Response,
  ) {
    res.status(HttpStatus.OK);
    return [];
  }

  // MEMO: The order of the handler functions are taken into consideration to following this issue
  // See: https://github.com/nestjs/nest/issues/1667
  @Get(':id')
  useParamOrderConsiderd(@Param('id') id: string): string {
    return id;
  }
}
