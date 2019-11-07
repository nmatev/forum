import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DeletePostComponent } from './delete-post.component';
import { NotificatorService } from 'src/app/core/notificator.service';
import { PostService } from 'src/app/core/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsModule } from '../posts.module';
import { LoginComponent } from 'src/app/users/login/login.component';

describe('DeletePostComponent', () => {
    let component: DeletePostComponent;
    let fixture;

    let notificator = jasmine.createSpyObj('NotificatorService', ['success', 'error']);
    let postService = jasmine.createSpyObj('PostService', ['getAllPosts', 'getPost', 'createPost', 'updatePost', 'deletePost']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            declarations: [
                DeletePostComponent
            ],
            imports: [
                SharedModule
            ],
            providers: [
                {
                    provide: NotificatorService,
                    useValue: notificator,
                },
                {
                    provide: PostService,
                    useValue: postService,
                },
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
                {
                    provide: Router,
                    useValue: routerSpy,
                }
            ]

        })
    }));

    afterEach(()=> {
        if(fixture.nativeElement && 'remove' in fixture.nativeElement){
            (fixture.nativeElement as HTMLElement).remove();
        }
    });

    it('component created', () => {
        fixture = TestBed.createComponent(DeletePostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('html should contain "Delete Post"', () => {
        fixture = TestBed.createComponent(DeletePostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const bannerElement: HTMLElement = fixture.nativeElement;
        expect(bannerElement.textContent).toContain('Delete Your Post');
      });

    it('should have <button> with "Delete Post"', () => {
        fixture = TestBed.createComponent(DeletePostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const bannerElement: HTMLElement = fixture.nativeElement;
        const button = bannerElement.querySelector('button');
        expect(button.textContent).toEqual(' Delete Your Post ');
      });
      
    
    it('should do something', ()=> {
        fixture = TestBed.createComponent(DeletePostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        
    });

    it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
        let called = false;
        setTimeout(() => { called = true; }, 100);
        tick(100);
        expect(called).toBe(true);
      }));


      

    //   it('it should tell the router to navigate when the button is clicked ', () => {
        
    //     const spy = routerSpy.navigateByUrl as jasmine.Spy;
    //     const navArgs = spy.calls.first().args[0];

    //     const id = component.removeForumPost[0].id;
    //     expect(navArgs).toBe('/home', 'should navigate to home details');
        
    //   });

});