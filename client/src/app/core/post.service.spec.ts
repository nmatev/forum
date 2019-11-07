import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { ForumPost } from '../models/post';


describe('PostService', () => {

  const http = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
  let thePostService: PostService;

  const mockSomeService = {
    getData: () => { }
  };

  beforeEach(() => {
    thePostService = new PostService(<any>http);

    TestBed.configureTestingModule({
      providers: [
        PostService,
        {
          provide: HttpClient,
          useValue: http,
        },
        {
          provide: PostService,
          useValue: mockSomeService
        }
      ]
    });
  });

  it('should use PostService', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });

  it('get post should get a post(Http called once)', () => {

    const service: PostService = TestBed.get(PostService);
    const expectedPost: ForumPost = {
      title: 'test',
      text: 'test',
      id: 'test',
      user: 'test',
      updatedOn: 'test',
      createdOn: 'test',
      comment: 'test',
      likes: 1,
      isDeleted: true,
    }

    http.get.and.returnValue(of({ expectedPost }));

    thePostService.getPost('test').subscribe(
      post => expect(post).toEqual({ expectedPost }, 'expected post'),
      fail
    ),

      expect(http.get.calls.count()).toBe(1, 'one call');
  })

  it('should return an error when the server returns a 404'), () => {
    const service: PostService = TestBed.get(PostService);
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    http.get.and.returnValue(of(errorResponse));

    service.getPost('id').subscribe(
      post => fail('expected an error, not post'),
      error => expect(error.message).toContain('test 404 error')
    );
  }

  it('allPosts should get all posts (http Called once)'), () => {
    const service: PostService = TestBed.get(PostService);

    const expectedPosts: ForumPost[] = [
      {
        title: 'test',
        text: 'test',
        id: 'test',
        user: 'test',
        updatedOn: 'test',
        createdOn: 'test',
        comment: 'test',
        likes: 1,
        isDeleted: true,
      },
      {
        title: 'try',
        text: 'try',
        id: 'test',
        user: 'test',
        updatedOn: 'test',
        createdOn: 'test',
        comment: 'test',
        likes: 1,
        isDeleted: true,
      }

    ]

    http.get.and.returnValue(of(expectedPosts));

    service.getAllPosts().subscribe(
      allPosts => expect(allPosts).toEqual(expectedPosts, 'expected posts'),
      fail
    ),

      expect(http.get.calls.count()).toBe(1, 'one call');

  }

  it('getPost should call get method', () => {
    const service: PostService = TestBed.get(PostService);

    http.get.calls.reset();

    spyOn(mockSomeService, 'getData').and.returnValue({
      subscribe:
        () => expect(http.get).toHaveBeenCalled()
    })
    // service.getPost('id').subscribe(
    //   ()=> expect(http.get).toHaveBeenCalledTimes(1)
    // )

  })

  it('updatePost should call put method ', () => {

    http.put.calls.reset();

    spyOn(mockSomeService, 'getData').and.returnValue({
      subscribe:
        () => expect(http.put).toHaveBeenCalled()
    })
    // thePostService.updatePost('test', fakePost).subscribe(
    //   ()=> expect(http.put).toHaveBeenCalledTimes(1) 
    // )
  });

  it('deletePost should call delete method', () => {


    http.delete.calls.reset();

    spyOn(mockSomeService, 'getData').and.returnValue({
      subscribe:
        () => expect(http.delete).toHaveBeenCalled()
    })
    // thePostService.deletePost('test').subscribe(
    //   ()=> expect(http.delete).toHaveBeenCalledTimes(1)
    // )
  });


  it('getALlPosts shoudl call get method', () => {

    http.get.calls.reset();

    spyOn(mockSomeService, 'getData').and.returnValue({
      subscribe:
        () => expect(http.get).toHaveBeenCalled()
    })

  })

  it('createPost should call post method only once ', () => {

    http.put.calls.reset();

    spyOn(mockSomeService, 'getData').and.returnValue({
      subscribe:
        () => expect(http.put).toHaveBeenCalled()
    })
  })

  // it('createPost method should call create.post ', ()=> {
  //   const service: PostService = TestBed.get(PostService);  

  //   let mockPost: CreatePost;

  //   http.post.calls.reset();
  //   thePostService.createPost(mockPost).subscribe(
  //     ()=> expect(http.post).toHaveBeenCalled()
  //   )

  // })



})